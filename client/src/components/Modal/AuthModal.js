import React from "react";

import { Modal, Button, Input, Form } from "antd";

function AuthModal(props) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
