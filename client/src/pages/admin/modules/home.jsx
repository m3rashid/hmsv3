import React from "react";
import AdminWrapper from "../adminWrapper";

import Header from "../../../components/Header";
import CreateUserModal from "./helpers/createUserModal";
import { Divider } from "antd";

const Home = () => {
  const [online, setOnline] = React.useState(true);

  return (
    <>
      <Header online={online} setOnline={setOnline} />
      <Divider />

      <AdminWrapper>
        <CreateUserModal isEdit={false} />
      </AdminWrapper>
    </>
  );
};

export default Home;
