import Redis from "ioredis";
import { AuthenticatedWebSocket } from "./websocket.types";
import { PresenceService } from "./PresenceService";
import { ClientManager } from "./ClientManager";

export class RoomService {
  private redis: Redis;
  private clientManager: ClientManager;
  private presenceService: PresenceService;

  constructor(
    redis: Redis,
    clientManager: ClientManager,
    presenceService: PresenceService
  ) {
    this.redis = redis;
    this.clientManager = clientManager;
    this.presenceService = presenceService;
  }

  async handleJoinRoom(ws: AuthenticatedWebSocket, roomId: string) {
    if (!ws.userId) return;

    ws.currentRooms?.add(roomId);

    // Add user to room in Redis
    await this.redis.sadd(`room:${roomId}:users`, ws.userId);

    // Add room to user's rooms list
    await this.redis.sadd(`user:${ws.userId}:rooms`, roomId);

    this.broadcastToRoom(
      roomId,
      {
        type: "user_joined",
        payload: { userId: ws.userId, roomId },
      },
      ws.userId
    );

    // Confirm to the user
    ws.send(
      JSON.stringify({
        type: "joined_room",
        payload: { roomId },
      })
    );
    console.log(`User ${ws.userId} joined room ${roomId}`);
  }

  async handleLeaveRoom(ws: AuthenticatedWebSocket, roomId: string) {
    try {
      if (!ws.userId) return;

      ws.currentRooms?.delete(roomId);

      // Remove user from Redis room set
      await this.redis.srem(`room:${roomId}:users`, ws.userId);

      // Remove room from user's rooms list
      await this.redis.srem(`user:${ws.userId}:rooms`, roomId);

      this.broadcastToRoom(
        roomId,
        {
          type: "user_left",
          payload: { userId: ws.userId, roomId },
        },
        ws.userId
      );
    } catch (error) {
      console.error("Error in handleLeaveRoom:", error);
      throw error;
    }
  }

  public async getOnlineUsersInRoom(roomId: string): Promise<string[]> {
    try {
      const roomUsers = await this.redis.smembers(`room:${roomId}:users`);
      const onlineUsers: string[] = [];

      for (const userId of roomUsers) {
        if (await this.presenceService.isUserOnline(userId)) {
          onlineUsers.push(userId);
        }
      }

      return onlineUsers;
    } catch (error) {
      console.error("Error getting online users in room:", error);
      throw error;
    }
  }

  async broadcastToRoom(
    roomId: string,
    message: any,
    excludedUserId?: string
  ): Promise<void> {
    try {
      const roomUsers = await this.redis.smembers(`room:${roomId}:users`);

      roomUsers.forEach((userId: string) => {
        if (userId === excludedUserId) return;

        const userSocket = this.clientManager.getClient(userId);
        if (userSocket && userSocket.readyState === 1) {
          // WebSocket.OPEN = 1
          userSocket.send(JSON.stringify(message));
        }
      });
    } catch (error) {
      console.error("Error broadcasting to room:", error);
    }
  }
}
