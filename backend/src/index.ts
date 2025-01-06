import { WebSocket, WebSocketServer } from "ws";
const ws = new WebSocketServer({ port: 8080 });
let user = 0;
const users: WebSocket[] = [];
ws.on("connection", (socket) => {
  users.push(socket);
  user = user + 1;
  console.log("user connected, No:", user);
  socket.on("message", (message) => {
    users.forEach((e) => {
      e.send(message.toString());
    });
  });
});
