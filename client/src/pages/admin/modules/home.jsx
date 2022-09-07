import React from "react";
import AdminWrapper from "../adminWrapper";

import CreateUserModal from "./helpers/createUserModal";

const Home = () => {
  return (
    <AdminWrapper>
      <CreateUserModal isEdit={false} />
    </AdminWrapper>
  );
};

export default Home;
