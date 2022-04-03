import React from "react";
import { Tabs, Divider } from "antd";

import Header from "../../components/Header";
import Appointments from "./modules/Appointments";
import Patients from "./modules/patients";
import Notifications from "./modules/notifications";

const Doctor = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Doctor Dan",
    email: "doctordan@gmail.com",
    online: online,
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
        }}
      >
        <Header title="Home" subTitle="" user={user} />
        <Divider />

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Appointments" key="1">
            <Appointments />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Patients" key="3">
            <Patients />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Notifications" key="4">
            <Notifications />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Doctor;
