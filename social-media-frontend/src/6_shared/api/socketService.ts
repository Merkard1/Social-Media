import { io, Socket } from "socket.io-client";

import { LOCAL_STORAGE_ACCESS_TOKEN } from "../const/localstorage";

class SocketService {
  private socket: Socket | null = null;

  private isConnected = false;

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket && this.isConnected) {
        resolve();
        return;
      }

      const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN) || "";

      this.socket = io("http://localhost:5001", {
        auth: { token },
        transports: ["websocket", "polling"],
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket?.id);
        this.isConnected = true;
        resolve();
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        this.isConnected = false;
        this.socket = null;
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        reject(error);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log("Socket manually disconnected.");
    }
  }

  emit(event: string, data: any) {
    console.log("SocketService emit -> event:", event, ", data:", data);
    if (!this.isConnected || !this.socket) {
      console.error("Cannot emit, socket is not connected.");
      return;
    }
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.isConnected || !this.socket) {
      console.error("Cannot listen, socket is not connected.");
      return;
    }
    this.socket.on(event, callback);
  }

  off(event: string, callback?: (data: any) => void) {
    if (!this.isConnected || !this.socket) {
      console.error("Cannot remove listener, socket is not connected.");
      return;
    }
    this.socket.off(event, callback);
  }

  joinChat(chatId: string) {
    this.emit("join:chat", chatId);
    console.log(`Emitted 'join:chat' for chat ID: ${chatId}`);
  }

  leaveChat(chatId: string) {
    this.emit("leave:chat", chatId);
    console.log(`Emitted 'leave:chat' for chat ID: ${chatId}`);
  }

  get socketInstance() {
    return this.socket;
  }
}

const socketService = new SocketService();
export default socketService;
