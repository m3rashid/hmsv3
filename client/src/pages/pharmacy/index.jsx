import React from "react";
import Header from "../../components/Header";

const Pharmacy = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    online: online,
    avatar: "reception",
  };
  return (
    <>
      <Header title="Reception" subTitle="" user={user} />
    </>
  );
};

export default Pharmacy;
