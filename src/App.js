import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";
import { useState } from "react";
import { io } from "socket.io-client";
import Register from "./pages/Register";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                {chatScreen ? (
                  <ChatPage socket={socket}  username={username}  room={room} />
                ) : (
                  <Home
                    username={username}
                    setUserName={setUserName}
                    setRoom={setRoom}
                    room={room}
                    setChatScreen={setChatScreen}
                    socket={socket}
                  />
                )}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
