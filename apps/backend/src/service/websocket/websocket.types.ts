import type { WebSocket } from "ws";

export interface AuthenticatedWebSocket extends WebSocket {
  userId?: string;
  clerkId?: string;
  currentRooms?: Set<string>;
}

export interface WebSocketMessage {
  type: "join_room" | "leave_room" | "send_message" | "typing" | "stop_typing";
  payload: any;
}
