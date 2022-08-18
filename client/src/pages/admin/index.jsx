import { Divider, Tabs } from "antd";
import React from "react";

import Header from "../../components/Header";
import Home from "./modules/home";
import Receptionists from "./modules/receptionists";
import Doctors from "./modules/doctors";
import Patients from "./modules/patients";
import Pharmacists from "./modules/pharmacists";
import InventoryManagers from "./modules/inventoryManager";
import CoAdmins from "./modules/coAdmin";
import Others from "./modules/others";

const Admin = () => {
  const [online, setOnline] = React.useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <Header online={online} setOnline={setOnline} />
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

        <Tabs.TabPane tab="Pharmacists" key="2">
          <Pharmacists />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Inventory Managers" key="2">
          <InventoryManagers />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Co Admins" key="2">
          <CoAdmins />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Others" key="2">
          <Others />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Patients" key="4">
          <Patients />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
