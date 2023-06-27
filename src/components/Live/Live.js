import React from "react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const Live = ({ username, setUserName, room, setRoom , setChatScreen , socket }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    message.success("Çıkış İşlemi Başarılı");
  };
  const loginRoom = () => {
    socket.emit('room',room)
    setChatScreen(true)
  };
  return (
    <div className="flex items-center justify-center h-screen max-md:px-5">
      <div className="w-1/4 max-md:w-full h-96 bg-orange-500 rounded-xl to-black flex flex-col justify-center gap-y-7 px-5">
        <h1 className="text-center text-white font-bold text-2xl">
          Welcome to SocketIO Case
        </h1>
        <Input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Kullanıcı Adı"
        />
        <Input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Oda"
        />
        <Button onClick={loginRoom} className="text-white rounded-full">
          Chat Yapmaya Başla
        </Button>
        <Button onClick={logOut} className="text-white rounded-full">
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
};

export default Live;
