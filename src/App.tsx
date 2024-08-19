import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // If AuthContext is undefined, return null or a fallback UI
    return <Login />;
  }

  const { user } = authContext;
  return (
    <>
      <Routes>
        <Route path="/chat" element={user ? <Chat /> : <Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
