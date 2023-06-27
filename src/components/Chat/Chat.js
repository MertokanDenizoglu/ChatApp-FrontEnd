import React, { useEffect, useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import sound from "../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const playSound = () => {
    new Audio(sound).play();
  };
  const showNotification = () => {
       document.title = "Yeni bir mesaj aldınız!";
       setTimeout(() => {
         document.title = "React Chat App";
       }, 100000);
     };
  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
      playSound();
      showNotification();
    });
  }, [socket]);
  console.log(message);
  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };
  console.log("messagelist", messageList);
  return (
    <div className="flex justify-center items-center h-screen  max-md:px-5 rounded-lg ">
      <div className="w-1/4 max-md:w-full h-96 bg-white rounded-lg relative ">
        <div className="bg-orange-500 w-full h-16 flex items-center p-2">
          <div className="w-12 h-12 bg-white flex rounded-full ml-2">
            <UserOutlined className="w-full text-4xl" />
          </div>
        </div>
        <div className="w-full h-[280px] overflow-y-auto ">
          {messageList &&
            messageList.map((msg, index) => {
              return (
                <div
                  className={` ${
                    username === msg.username ? "flex justify-end" : ""
                  } `}
                >
                  <div
                    className={` ${
                      username === msg.username ? "bg-gray-500" : "bg-black"
                    } w-1/2 h-12  text-white text-sm m-2 rounded-br-none rounded-xl p-2`}
                  >
                    <div>{msg.message}</div>
                    <div className="text-xs w-full flex justify-end">
                      {msg.username}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="absolute bottom-0 flex w-full gap-x-2 p-1 ">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`${username} Olarak Mesajınız ...`}
            className="w-full"
          />
          <Button onClick={sendMessage} icon={<SendOutlined />} />
          <Button
            onClick={() => {
              window.location.reload();
            }}
            icon={<LogoutOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
