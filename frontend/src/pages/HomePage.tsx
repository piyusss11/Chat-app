import { FC, useRef, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import LogoIcon from "../components/icons/logoIcon";
// import useJoinRoom from "../hooks/useJoinRoom";
interface HomePageProps {
  onUserLeave: () => void;
}
const HomePage: FC<HomePageProps> = ({ onUserLeave }) => {
  const roomIdRef = useRef<HTMLInputElement | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  const handleRoomJoin = () => {
    if (!roomIdRef?.current?.value) return;
    setRoomId(roomIdRef?.current?.value);
    roomIdRef.current.value = "";
  };
  return (
    <div className="p-10 ">
      <nav className="md:flex md:justify-between md:items-center">
        <div className="flex gap-2 items-center justify-center">
          <LogoIcon /> Chatty
        </div>
        <div className="flex gap-4">
          <input
            ref={roomIdRef}
            className="text-black border ml-4 border-gray-300 rounded-lg px-2 py-1 outline-none"
            type="text"
            placeholder="Enter roomid"
          />
          <button
            onClick={handleRoomJoin}
            className="bg-white text-black px-2 py-1 rounded-lg"
          >
            Join room
          </button>
          
        </div>
        <button
          className="bg-white text-black px-2 py-1 rounded-lg"
          onClick={onUserLeave}
        >
          Logout
        </button>
      </nav>
      {roomId?.length > 0 ? (
        <div>
          <ChatRoom roomId={roomId} />
          <button
            onClick={() => setRoomId("")}
            className="bg-red-500 text-white px-2 py-1 rounded-lg"
          >
            Leave Room
          </button>
        </div>
      ) : (
        <h1 className="text-2xl flex justify-center items-center h-80">
          Please enter roomid
        </h1>
      )}
      {/* <ChatRoom /> */}
    </div>
  );
};

export default HomePage;
