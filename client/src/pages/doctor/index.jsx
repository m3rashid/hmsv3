import React from "react";
import Header from "../../components/Header";

const Doctor = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Doctor Dan",
    email: "doctordan@gmail.com",
    online: online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Doctor;
