import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const UnAuthPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>You are not authorized to view this section</div>
      <Button onClick={() => navigate("/")}>Back to home</Button>
    </>
  );
};

export default UnAuthPage;
