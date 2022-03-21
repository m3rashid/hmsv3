import React from "react";
import Header from "../../components/Header";

const Appointments = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Appointment Register",
    email: "appointmentregister@gmail.com",
    online: online,
  };
  return (
    <>
      <Header title="Home" subTitle="" user={user} />;
    </>
  );
};

export default Appointments;
