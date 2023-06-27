import React from "react";
import { Button, Form, Input, message } from "antd";
import { loginUser } from "../services/auth/login";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const user = await loginUser(values.email, values.password);
      console.log(user.data);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user.data));
      }
      message.success("Giriş İşlemi Başarılı");
      navigate("/");
    } catch (error) {
      message.error("Bir Hata Oluştu");
    }
  };

  return (
    <div className="flex max-md:pt-36">
      <div className="w-2/6 max-lg:w-full px-16 m-auto items-center justify-center">
        <Form className="w-full" layout="vertical" onFinish={onFinish}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "E-mail Alanı Boş Bırakılamaz",
              },
            ]}
            name={"email"}
            label="E-posta Adresi"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Şifre Alanı Boş Bırakılamaz",
              },
            ]}
            name={"password"}
            label="Şifre"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" danger htmlType="submit">
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div className="grid gap-y-4 justify-center">
          <span className="font-semibold">Henüz Hesabın Yokmu ?</span>
          <Link to={"/register"} className="text-center text-orange-400 font-semibold">
            Hemen Kayıt Ol !
          </Link>
        </div>
      </div>
      <div className="w-4/6 h-screen bg-amber-300 max-md:hidden"></div>
    </div>
  );
};

export default Login;
