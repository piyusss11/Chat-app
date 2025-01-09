import { WebSocketServer, WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 });

interface IUser {
  room: string;
  socket: WebSocket;
}
interface IMessage {
  type: "join" | "message";
  payload: {
    roomId: string;
    name: string;
    message?: string;
  };
}

// const a = { type: "join", payload: { roomId: "123",name:"piyush" } };
let activeUsers = 0;
let allUsers: IUser[] = [];

ws.on("connection", (socket) => {
  activeUsers = activeUsers + 1;
  console.log(`A new user connected. Active users: ${activeUsers}`);
  socket.on("message", (mesaage: string) => {
    try {
      const messageObj: IMessage = JSON.parse(mesaage);
      const {
        type,
        payload: { roomId, name },
      } = messageObj;
      if (type === "join") {
        console.log(`${name} joined room ${roomId}`);
        allUsers.push({ room: roomId, socket }); // created a room
      }
      if (messageObj.type === "message") {
        console.log(`${name} : ${messageObj.payload.message}`);
        const currentUserRoom = allUsers.find((x) => x.socket == socket)?.room;
        if (currentUserRoom) {
          allUsers
            .filter(
              (user) => user.room == currentUserRoom && user.socket !== socket
            )
            .forEach((user) =>
              user.socket.send(
                JSON.stringify({ name, message: messageObj.payload.message })
              )
            );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("close", () => {
    activeUsers--;
    allUsers.filter((user) => user.socket !== socket);
    console.log(`A user disconnected. Active users: ${activeUsers}`);
  });
});
