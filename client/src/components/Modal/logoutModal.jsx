import { Modal } from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "api/instance";
import { authDefaultState } from "atoms/auth";

const LogoutModal = ({ isModalVisible, setIsModalVisible, setAuth }) => {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("refresh_token");
    navigate("/");

    socket.disconnect();
    setAuth(authDefaultState);
  }, [navigate, setAuth]);

  const handleCancel = () => setIsModalVisible(false);

  return (
    <Modal
      title="Logout"
      okText="Logout"
      open={isModalVisible}
      onOk={handleLogout}
      onCancel={handleCancel}
    >
      Are you sure, you want to log out ?
    </Modal>
  );
};

export default LogoutModal;
