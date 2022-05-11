import React from "react";

import { Modal, Button, Input, Form, message } from "antd";
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/auth";
import { instance } from "../../api/instance";

function AuthModal(props) {
  const [, setAuth] = useRecoilState(authState);
  const onFinish = async (values) => {
    try {
      message.loading({
        content: "Loading...",
        key: "auth/login",
      });
      const { data } = await instance.post("/auth/login", values);

      setAuth({
        isLoggedIn: true,
        user: data.user,
        token: data.token,
      });
      message.success({
        content: "Login Successful",
        key: "auth/login",
      });
    } catch (error) {
      message.error({
        content: "Login Failed",
        key: "auth/login",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error({
      content: "Login Failed",
      key: "auth/login",
    });
  };

  return (
    <React.Fragment>
      <Modal
        title="Login"
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
      >
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            rules={[{ required: true, message: "Please enter your username!" }]}
            name="username"
            label="Username"
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default AuthModal;
