import React from "react";
import Header from "../../components/Header";

const Pharmacy = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Pharmacist",
    email: "pharmacist@gmail.com",
    online: online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Pharmacy;
