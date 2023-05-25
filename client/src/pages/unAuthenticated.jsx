import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const UnAuthPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>You are not authorized to view this section</div>
      <Button onClick={() => navigate("/")}>Back to home</Button>
    </div>
  );
};

export default UnAuthPage;
