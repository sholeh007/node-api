import { Server } from "socket.io";

let io;
const socket = {
  init(httpServer) {
    io = new Server(httpServer, {
      cors: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    });
    return io;
  },
  getIo() {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};

export default socket;
