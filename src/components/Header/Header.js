import { Input, message } from "antd";
import React from "react";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logOut = () => {
    if (window.confirm("Çıkış Yapmak İstediğinize Emin misiniz?")) {
      localStorage.removeItem("user");
      window.location.reload();
      message.success("Çıkış Yapılıyor")
    }
  };
  return (
    <div className="flex justify-between">
      <h1 className="text-3xl font-bold mt-1 ml-2">LOGO</h1>
      <Input className="rounded-full w-1/2 mt-4" />
      <div className="flex gap-x-10 mr-5">
        <HomeOutlined
          onClick={() => {
            navigate("/");
          }}
          className=" text-2xl"
        />
        <LogoutOutlined onClick={logOut} className=" text-2xl" />
      </div>
    </div>
  );
};

export default Header;
