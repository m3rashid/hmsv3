import React from "react";
import Header from "../../components/Header";

const Admin = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Super Admin",
    email: "superadmin@gmail.com",
    online: online,
  };

  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Admin;
