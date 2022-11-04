import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on('logs', (data) => {
      console.log(data);
    });
  }

  getLogs() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.on('logs', (data) => {
        console.log(data);
        return data;
    });
  }
  
  disconnect() {
    if(this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();