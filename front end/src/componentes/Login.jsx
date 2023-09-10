import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const loginRequest = (email, password) => {
  axios
    .post("http://localhost:3000/api/users/login", { email, password })
    .then((response) => {
      console.log("Respuesta exitosa:", response);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
};

const Login = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="email"
      name="email"
      rules={[
        {
          required: true,
          message: "Please input your username!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: "Please input your password!",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          loginRequest(Input.Input, Input.Password);
        }}
      >
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default Login;
