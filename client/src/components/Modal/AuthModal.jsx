import { useRecoilState } from "recoil";
import { Modal, Button, Input, Form, message } from "antd";

import { socket } from "api/instance";
import { authState } from "atoms/auth";
import { instance } from "api/instance";

function AuthModal({ handleCancel, isModalVisible, handleOk }) {
  const [, setAuth] = useRecoilState(authState);
  const onFinish = async (values) => {
    try {
      message.loading({ content: "Loading...", key: "auth/login" });
      const { data } = await instance.post("/auth/login", {
        email: values.email.trim(),
        password: values.password.trim(),
      });

      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      setAuth({
        isLoggedIn: true,
        user: data.user,
        token: data.token,
      });

      localStorage.setItem("refresh_token", data.refreshToken);
      socket.io.opts.auth.token = data.token;
      socket.disconnect().connect();

      message.success({ content: "Login Successful", key: "auth/login" });
      handleCancel();
    } catch (error) {
      message.error({ content: "Login Failed", key: "auth/login" });
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: "Login Failed",
      key: "auth/login",
    });
  };

  return (
    <Modal
      title="Login"
      footer={null}
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          rules={[{ required: true, message: "Please enter your username!" }]}
          name="email"
          label="Email"
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input placeholder="Password" type="password" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #f0f0f0",
            margin: "24px -24px -10px -24px",
            padding: "10px 24px 0 24px",
          }}
        >
          <Button style={{ marginRight: "10px" }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AuthModal;
