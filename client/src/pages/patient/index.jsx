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
    <div
      style={{
        padding: "20px",
      }}
    >
      <Header title="Home" subTitle="" user={user} />
    </div>
  );
};

export default Patient;
