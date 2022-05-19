import { Button } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const UnAuthPage = () => {


  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div style={{ height: "50%" }}>
=======
    <div style={{height:"50%"}}>
>>>>>>> create user interface
      <div>You are not authorized to view this section</div>
      <Button onClick={() => navigate("/")}>Back to home</Button>
    </div>
  );
};

export default UnAuthPage;
