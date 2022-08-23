import React from "react";

import CreateUserModal from "./helpers/createUserModal";

const Home = () => {
  return (
    <div style={{ marginTop: "10px", marginLeft: "0px" }}>
      <CreateUserModal isEdit={false} />
    </div>
  );
};

export default Home;
