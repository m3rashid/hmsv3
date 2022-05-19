import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

import { authDefaultState } from "../../atoms/auth";

const LogoutModal = ({ isModalVisible, setIsModalVisible, setAuth }) => {
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    localStorage.removeItem("refresh_token");
    navigate("/");
    setAuth(authDefaultState);
  }, [setAuth, navigate]);

  const handleCancel = () => setIsModalVisible(false);

  return (
    <Modal
      title="Logout"
      okText="Logout"
      visible={isModalVisible}
      onOk={handleLogout}
      onCancel={handleCancel}
    >
      Are you sure, you wnat to log out ?
    </Modal>
  );
};

export default LogoutModal;
