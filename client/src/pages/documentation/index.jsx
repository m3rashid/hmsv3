import MindMapGraph from "components/documentation/mindMap";
import React, { Fragment } from "react";
import { Tabs, Typography } from "antd";
import DefaultPermissions from "components/documentation/defaultPermissions";
import Admin from "components/documentation/admin";
import Doctor from "components/documentation/doctor";
import CoAdmin from "components/documentation/coAdmin";
import Receptionist from "components/documentation/receptionist";
import Pharmacist from "components/documentation/pharmacist";
import InventoryManager from "components/documentation/inventoryManager";

const Learn = () => {
  return (
    <Fragment>
      <Typography.Title level={3}>Documentation</Typography.Title>
      <Tabs
        defaultActiveKey="1"
        centered
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          height: "calc(100vh - 200px)",
        }}
        items={[
          {
            key: "1",
            label: "App Overview",
            children: <MindMapGraph />,
          },
          {
            key: "2",
            label: "Default Permissions",
            children: <DefaultPermissions />,
          },
          {
            key: "3",
            label: "Admin",
            children: <Admin />,
          },
          {
            key: "4",
            label: "Co Admin",
            children: <CoAdmin />,
          },
          {
            key: "5",
            label: "Doctor",
            children: <Doctor />,
          },
          {
            key: "6",
            label: "Receptionist",
            children: <Receptionist />,
          },
          {
            key: "7",
            label: "Pharmacist",
            children: <Pharmacist />,
          },
          {
            key: "8",
            label: "Inventory Manager",
            children: <InventoryManager />,
          },
        ]}
      />
    </Fragment>
  );
};

export default Learn;
