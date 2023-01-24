import { useState } from "react";
import { Button, Space, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import AuthModal from "components/Modal/AuthModal";
import LogoutModal from "components/Modal/logoutModal";

const UserTop = ({ Auth, setAuth }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (Auth.isLoggedIn) {
    return (
      <Space>
        <UserOutlined />
        <Typography.Text type="secondary" italic style={{ color: "white" }}>
          Welcome, {Auth.user.email}
        </Typography.Text>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          <LogoutOutlined />
        </Button>
        <LogoutModal {...{ isModalVisible, setAuth, setIsModalVisible }} />
      </Space>
    );
  }

  return (
    <>
      <Button onClick={() => setIsModalVisible(true)}>Login</Button>
      <AuthModal
        isModalVisible={isModalVisible}
        handleCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default UserTop;
