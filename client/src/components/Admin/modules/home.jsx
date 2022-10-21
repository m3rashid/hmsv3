import React from "react";

import AdminWrapper from "components/Admin/adminWrapper";
import ProfileWrapper from "components/Profile/ProfileWrapper";
import CreateUserModal from "components/Admin/modules/helpers/createUserModal";

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
