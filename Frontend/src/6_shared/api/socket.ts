// frontend/src/6_shared/api/socket.ts

import { io, Socket } from "socket.io-client";

// Enable Socket.IO debugging in the browser console
(window as any).io = io;

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    this.socket = io("http://localhost:5001", { // Backend Host Port
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }

  emit(event: string, data: any, callback?: (...args: any[]) => void) {
    this.socket?.emit(event, data, callback);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.socket?.off(event, callback);
  }

  // Expose Socket Instance for Debugging (Optional)
  get socketInstance() {
    return this.socket;
  }
}

const socketService = new SocketService();
export default socketService;
