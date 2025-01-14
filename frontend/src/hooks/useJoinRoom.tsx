import { useEffect, useState } from "react";

interface UseJoinRoomParams {
  roomId: string;
}

const useJoinRoom = ({ roomId }: UseJoinRoomParams) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const user = localStorage.getItem("user")

  useEffect(() => {
    const connect = () => {
      const socket = new WebSocket("ws://localhost:8080");

      socket.onopen = () => {
        console.log("WebSocket connected");
        socket.send(
          JSON.stringify({
            type: "join",
            payload: { roomId, name:user },
          })
        );
      };

      socket.onclose = (event) => {
        console.warn("WebSocket closed. Reconnecting...", event.reason);
        setTimeout(() => connect(), 3000); 
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(socket);
    };

    connect();

    return () => {
      ws?.close();
    };
  }, [roomId,user]);

  return ws;
};

export default useJoinRoom;
