import { Tabs } from "antd";
import React from "react";

const Admin = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      tabPosition="left"
      centered
      items={[
        { key: "0", label: "User Update", children: <div>Update User</div> },
        {
          key: "1",
          label: "Edit Permissions",
          children: <div>Edit Permissions</div>,
        },
        { key: "2", label: "Log Reports", children: <div>Log Reports</div> },
        { key: "3", label: "Edit Config", children: <div>Edit Config</div> },
        {
          key: "4",
          label: "Data Migration",
          children: <div>Data Migration</div>,
        },
      ]}
    />
  );
};

export default Admin;
