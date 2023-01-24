import { Result, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorHandlerFallback = ({ removeError }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentPath, setCurrentpath] = useState("");

  useEffect(() => {
    setCurrentpath(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentPath) return;
    if (currentPath !== pathname) {
      removeError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Result
      status="500"
      title="400"
      subTitle="Sorry, something went wrong."
      style={{ height: "calc(100vh - 94px)", paddingTop: 150 }}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default ErrorHandlerFallback;
