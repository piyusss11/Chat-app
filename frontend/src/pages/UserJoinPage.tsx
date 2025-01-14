import { FC, useRef } from "react";

interface UserJoinPageProps {
  onUserJoin: (user: string) => void;
}

const UserJoinPage: FC<UserJoinPageProps> = ({ onUserJoin }) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleUsernameSubmit = () => {
    const name = nameRef.current?.value;
    if (name) {
      localStorage.setItem("user", name);
      onUserJoin(name); // Notify the parent component
    }
  };

  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
      <div className="shadow-slate-100 shadow-md p-8">
        <h1 className="text-4xl mb-4 text-center">Welcome to Chatty</h1>
        <div>
          <p className="text-lg mb-4">
            Join the conversation and share your thoughts with others.
          </p>
          <label htmlFor="name">
            Username:
            <input
              ref={nameRef}
              type="text"
              name="name"
              className="text-black border ml-4 border-gray-300 rounded-lg px-2 py-1 outline-none"
            />
          </label>
          <button
            type="submit"
            onClick={handleUsernameSubmit}
            className="ml-4 bg-white hover:bg-slate-700 text-black hover:text-white font-bold py-1 px-2 rounded"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserJoinPage;
