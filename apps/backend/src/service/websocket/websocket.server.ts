import { AuthService } from "./../../features/auth/auth.service";
import { WebSocketServer } from "ws";
import Redis from "ioredis";
import { AuthenticatedWebSocket } from "./websocket.types";
import { IncomingMessage, Server } from "http";
import { URL } from "url";
import { PresenceService } from "./PresenceService";
import { MessageService } from "./messageService";
import { ClientManager } from "./ClientManager";
import { RoomService } from "./RoomService";

export class ChatWebSocketServer {
  private AuthService = new AuthService();
  private wss: WebSocketServer;
  private redis: Redis;
  private presenceService;
  private clientManager: ClientManager;
  private messageService;
  private roomService;

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: "/ws" });
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
    });

    this.clientManager = new ClientManager();
    this.presenceService = new PresenceService(this.redis);
    this.roomService = new RoomService(
      this.redis,
      this.clientManager,
      this.presenceService
    );
    this.messageService = new MessageService(this.redis, this.roomService);

    this.setupWebSocketServer();
  }

  public get clientCount(): number {
    return this.wss.clients.size;
  }

  private setupWebSocketServer() {
    this.wss.on(
      "connection",
      (ws: AuthenticatedWebSocket, request: IncomingMessage) => {
        console.log("New Websocket connection");

        this.authenticateConnection(ws, request)
          .then((user) => {
            if (user) {
              ws.userId = user.userId;
              ws.clerkId = user.clerkId;
              ws.currentRooms = new Set();

              //store the authenticated connection
              this.clientManager.addClient(user.userId!, ws);

              // set user as online in Redis
              this.presenceService.setUserOnline(user.userId!);

              console.log(`User ${user.userId} connected`);

              ws.on("message", (data) => {
                this.messageService.handleMessage(ws, data);
              });

              ws.on("close", () => {
                this.handleDisconnection(ws);
              });
            }
          })
          .catch((err) => {
            console.error("Error authenticating connection:", err);
            ws.close(1008, "Authentication failed");
          });
      }
    );
  }

  private async authenticateConnection(
    ws: AuthenticatedWebSocket,
    request: IncomingMessage
  ): Promise<{ userId?: string; clerkId?: string; name?: string } | null> {
    try {
      const url = new URL(request.url || "", `http://${request.headers.host}`);
      const token = url.searchParams.get("token");

      if (!token) return null;

      const user = await this.AuthService.verifyToken(token);
      console.log("user ", user);
      return user;
    } catch (err) {
      console.error("Authentication error:", err);
      throw err;
    }
  }

  private async handleDisconnection(ws: AuthenticatedWebSocket) {
    if (!ws.userId) return;

    console.log(`User ${ws.userId} disconnected`);

    // Leave all rooms
    if (ws.currentRooms) {
      for (const roomId of ws.currentRooms) {
        await this.roomService.handleLeaveRoom(ws, roomId);
      }
    }

    // Set user as offline
    await this.presenceService.setUserOffline(ws.userId);

    // Remove from clients
    this.clientManager.removeClient(ws.userId);
  }

  public getPresenceService(): PresenceService {
    return this.presenceService;
  }

  public getRoomService(): RoomService {
    return this.roomService;
  }
}
