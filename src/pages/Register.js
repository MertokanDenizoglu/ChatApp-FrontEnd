import React from "react";
import { Button, Form, Input, message } from "antd";
import { registerUser } from "../services/auth/login";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      await registerUser(values.email, values.password, values.username);
      message.success("Kayıt İşlemi Başarılı");
      navigate("/");
    } catch (error) {
      message.error("Kayıt İşlemi Başarısız");
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
                message: "Kullanıcı Adı Alanı Boş Bırakılamaz",
              },
            ]}
            name={"username"}
            label="Kullanıcı Adı"
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            dependencies={["password"]}
            name={"passwordRety"}
            label="Şifre Tekrar"
            rules={[
              {
                required: true,
                message: "Şifrenizi Doğrulayınız",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Şifreler Uyuşmuyor"));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" danger htmlType="submit">
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
        <div className="grid gap-y-4 justify-center">
          <span className="font-semibold">Bir Hesabın Varmı ?</span>
          <Link
            to={"/login"}
            className="text-center text-orange-400 font-semibold"
          >
            Hemen Giriş Yap !
          </Link>
        </div>
      </div>
      <div className="w-4/6 h-screen bg-amber-300 max-md:hidden"></div>
    </div>
  );
};

export default Register;
