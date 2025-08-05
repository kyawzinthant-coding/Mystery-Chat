import dotenv from "dotenv";
import app from "./app";
import { createServer } from "http";
import { ChatWebSocketServer } from "./service/websocket/websocket.server";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer(app);

const wsServer = new ChatWebSocketServer(server);

app.get("/ws", (req, res) => {
  res.status(200).json({ status: "ok", ws_connections: wsServer.clientCount });
});

server.listen(PORT, () => {
  console.log(`🚀 HTTP/WS Server running on port ${PORT}`);
  console.log(`🔌 WebSocket server available at ws://localhost:${PORT}/ws`);
});
