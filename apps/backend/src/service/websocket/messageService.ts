import Redis from "ioredis";
import prisma from "../../lib/prisma";
import { AuthenticatedWebSocket, WebSocketMessage } from "./websocket.types";
import { RoomService } from "./RoomService";
import { ClientManager } from "./ClientManager";

export class MessageService {
  private roomService: RoomService;
  private redis: Redis;

  constructor(redis: Redis, roomService: RoomService) {
    this.roomService = roomService;
    this.redis = redis;
  }

  async handleSendMessage(ws: AuthenticatedWebSocket, payload: any) {
    if (!ws.userId) return;

    const { roomId, content } = payload;

    const message = await prisma.message.create({
      data: {
        content,
        senderId: ws.userId,
        roomId,
      },
      include: {
        sender: true,
      },
    });

    const messageData = {
      type: "new_message",
      payload: {
        id: message.id,
        content: message.content,
        senderId: message.senderId,
        roomId: message.roomId,
      },
    };

    this.roomService.broadcastToRoom(roomId, messageData);
  }

  async handleTyping(
    ws: AuthenticatedWebSocket,
    roomId: string,
    isTyping: boolean
  ) {
    try {
      if (!ws.userId) return;

      const typingData = {
        type: isTyping ? "user_typing" : "user_stopped_typing",
        payload: {
          userId: ws.userId,
          roomId,
        },
      };

      await this.roomService.broadcastToRoom(roomId, typingData, ws.userId);
    } catch (error) {
      console.error("Error in handleTyping:", error);
    }
  }

  async handleMessage(ws: AuthenticatedWebSocket, data: any) {
    try {
      const message: WebSocketMessage = JSON.parse(data.toString());

      switch (message.type) {
        case "join_room":
          await this.roomService.handleJoinRoom(ws, message.payload.roomId);
          break;

        case "leave_room":
          await this.roomService.handleLeaveRoom(ws, message.payload.roomId);
          break;

        case "send_message":
          await this.handleSendMessage(ws, message.payload);
          break;

        case "typing":
          await this.handleTyping(ws, message.payload.roomId, true);
          break;

        case "stop_typing":
          await this.handleTyping(ws, message.payload.roomId, false);
          break;

        default:
          console.log("Unknown message type:", message.type);
      }
    } catch (error) {
      console.error("Error handling message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          payload: { message: "Invalid message format" },
        })
      );
    }
  }
}
