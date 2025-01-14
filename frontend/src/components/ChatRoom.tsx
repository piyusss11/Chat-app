import { FC, useEffect, useRef, useState } from "react";
import useJoinRoom from "../hooks/useJoinRoom";
interface IMessage {
  type: "message";
  payload: {
    roomId: string;
    name: string;
    message: string;
    timestamp?: string;
  };
}
interface ChatRoomProps {
  roomId: string;
}
const ChatRoom:FC<ChatRoomProps> = ({roomId}) => {
  const ws = useJoinRoom({ roomId  });
  const user = localStorage.getItem("user") || "You";
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleSendMessage = () => {
    const message = inputRef.current?.value;
    if (message && ws) {
      console.log(message);
      ws.send(
        JSON.stringify({
          type: "message",
          payload: { message: message, roomId, name: user },
        })
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "message", payload: { message, roomId, name: user, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) } },
      ]);
      inputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("recieved message", message);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "message",
          payload: {
            message: message?.message,
            roomId: "123",
            name: message?.name,
            timestamp:message?.timestamp
          },
        },
      ]);
    };
    return () => {
      if (ws) {
        ws.onmessage = null;
      }
    };
  }, [ws]);
  return (
    <div className="bg-black h-screen w-full flex flex-col items-center justify-center">
      <div className="bg-gray-900 w-[90%] h-4/5 rounded-lg shadow-xl flex flex-col">
        <div className="bg-gray-800 text-white text-center p-4 rounded-t-lg font-bold text-lg">
          Room - {roomId}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.payload.name === user ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-3 rounded-lg ${
                  message.payload.name === user
                    ? "bg-[#47505a] text-white"
                    : "bg-[#2c3035] text-gray-300"
                }`}
              >
                <p className="font-semibold underline">
                  {message.payload.name === user ? "You" : message.payload.name}
                </p>
                <p>{message.payload.message}</p>
                <p className="text-xs mt-1 flex flex-row-reverse">{message.payload.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex p-4 border-t border-gray-800 bg-gray-900">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg outline-none placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
