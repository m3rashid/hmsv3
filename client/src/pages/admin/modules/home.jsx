import React from "react";
import { Button } from "antd";

import CreateUserModal from "./helpers/createUserModal";

const Home = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <div>
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => setIsModalVisible(true)}
        >
          Register New User
        </Button>
      </div>
      <CreateUserModal
        isModalVisible={isModalVisible}
        handleOk={() => setIsModalVisible(true)}
        handleCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default Home;
