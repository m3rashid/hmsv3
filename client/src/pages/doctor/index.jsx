import React from "react";
import Header from "../../components/Header";

const Doctor = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    online: online,
    avatar: "reception",
  };
  return (
    <>
      <Header title="Doctor" subTitle="" user={user} />
    </>
  );
};

export default Doctor;
