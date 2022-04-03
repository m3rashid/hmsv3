import { Divider, Tabs } from "antd";
import React from "react";

import Header from "../../components/Header";
import Home from "./modules/home";
import Receptionists from "./modules/receptionists";
import Doctors from "./modules/doctors";
import Patients from "./modules/patients";

const Admin = () => {
  const [online, setOnline] = React.useState(true);
  const user = {
    name: "Super Admin",
    email: "superadmin@gmail.com",
    online: online,
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <Header title="Home" subTitle="" user={user} />
      <Divider />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Home" key="1">
          <Home />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Receptionists" key="2">
          <Receptionists />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Doctors" key="3">
          <Doctors />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Patients" key="4">
          <Patients />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
