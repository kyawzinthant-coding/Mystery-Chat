import { AuthenticatedWebSocket } from "./websocket.types";

export class ClientManager {
  private clients: Map<string, AuthenticatedWebSocket> = new Map();

  addClient(userId: string, ws: AuthenticatedWebSocket) {
    this.clients.set(userId, ws);
  }

  removeClient(userId: string) {
    this.clients.delete(userId);
  }

  getClient(userId: string): AuthenticatedWebSocket | undefined {
    return this.clients.get(userId);
  }

  getAllClients(): Map<string, AuthenticatedWebSocket> {
    return this.clients;
  }

  getClientsInRoom(roomId: string): AuthenticatedWebSocket[] {
    const roomClients: AuthenticatedWebSocket[] = [];
    this.clients.forEach((client) => {
      if (client.currentRooms?.has(roomId)) {
        roomClients.push(client);
      }
    });
    return roomClients;
  }
}
