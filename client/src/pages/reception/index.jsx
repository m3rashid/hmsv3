import React from "react";
import Header from "../../components/Header";

const Reception = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Receptionist",
    email: "receptionist@gmail.com",
    online: !online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Reception;
