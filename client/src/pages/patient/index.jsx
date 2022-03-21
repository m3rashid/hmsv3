import React from "react";
import Header from "../../components/Header";

const Patient = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Mareez",
    email: "mareez@gmail.com",
    online: !online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Patient;
