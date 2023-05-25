import { Tabs } from "antd";
import React from "react";
import AllPermissions from "./permissions";

const Admin = () => {
  return (
    <Tabs
      defaultActiveKey="0"
      tabPosition="left"
      centered
      items={[
        { key: "0", label: "Permissions", children: <AllPermissions /> },
        { key: "1", label: "User Update", children: <div>Update User</div> },
        {
          key: "2",
          label: "Edit Permissions",
          children: <div>Edit Permissions</div>,
        },
        { key: "3", label: "Edit Config", children: <div>Edit Config</div> },
        {
          key: "4",
          label: "Data Migration",
          children: <div>Data Migration</div>,
        },
        { key: "5", label: "Log Reports", children: <div>Log Reports</div> },
      ]}
    />
  );
};

export default Admin;
