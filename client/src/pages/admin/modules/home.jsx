import React from "react";
import ProfileWrapper from "../../profile/profileWrapper";
import AdminWrapper from "../adminWrapper";

import CreateUserModal from "./helpers/createUserModal";

const Home = () => {
  return (
    <>
      <ProfileWrapper>
        <AdminWrapper>
          <CreateUserModal isEdit={false} />
        </AdminWrapper>
      </ProfileWrapper>
    </>
  );
};

export default Home;
