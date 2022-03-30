import React from "react";
import Header from "../../components/Header";
import { Tabs, Divider, Table } from "antd";
import Appointments from "./modules/Appointments";

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
          <Tabs.TabPane tab="Prescriptions" key="2">
            Prescriptions Module
          </Tabs.TabPane>
          <Tabs.TabPane tab="Patients" key="3">
            Patients Module
          </Tabs.TabPane>
          <Tabs.TabPane tab="Notifications" key="4">
            Notifications Module
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Doctor;
