import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/Authcontext";
import { Navigate } from "react-router-dom";
import { ChatContextProvider } from "./context/Chatcontext";
import Test from "./pages/Test";
import { TestContextProvider } from "./context/Testcontext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = localStorage.getItem("User");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

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
        <Route path="/login" element={<Login />} />
        

        <Route
          path="/test"
          element={
            <TestContextProvider>
              <Test />
            </TestContextProvider>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatContextProvider>
                <Chat />
              </ChatContextProvider>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
