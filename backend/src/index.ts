import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 8080 });
let activeUsers = 0;
let allUsers: WebSocket[] = [];
ws.on("connection", (socket) => {
  allUsers.push(socket);
  activeUsers = activeUsers + 1;
  console.log("activeUsers connected, No:", activeUsers);
  socket.on("message", (message) => {
    allUsers.forEach((e) => {
      e.send(message.toString());
    });
  });
  socket.on("close", () => {
    activeUsers = activeUsers - 1;
    console.log("activeUsersdisconnected");
    allUsers = allUsers.filter((e) => e !== socket);
    console.log(allUsers.length);
  });
});
