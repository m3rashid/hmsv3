import React from "react";
import { Button, Space, Typography } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import AuthModal from "components/Modal/AuthModal";
import LogoutModal from "components/Modal/logoutModal";

const UserTop = ({ Auth, setAuth }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  if (Auth.isLoggedIn) {
    return (
      <Space>
        {Auth.user.role === "ADMIN" && (
          <UserOutlined style={{ fontSize: 20 }} />
        )}
        {Auth.user.role === "DOCTOR" && (
          <UserOutlined style={{ fontSize: 20 }} />
        )}
        {Auth.user.role === "RECEPTIONIST" && (
          <UserOutlined style={{ fontSize: 20 }} />
        )}
        {Auth.user.role === "OTHER" && (
          <UserOutlined style={{ fontSize: 20 }} />
        )}
        <Typography.Text type="secondary" italic>
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
