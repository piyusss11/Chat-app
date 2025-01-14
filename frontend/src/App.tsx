import { useEffect, useState } from "react";
import UserJoinPage from "./pages/UserJoinPage";
import HomePage from "./pages/HomePage";

function App() {
  const [user, setUser] = useState<string | null>(null);

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {user ? (
        <HomePage onUserLeave={() => setUser(null)} />
      ) : (
        <UserJoinPage onUserJoin={setUser} />
      )}
    </>
  );
}

export default App;
