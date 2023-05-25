import MindMapGraph from "components/documentation/mindMap";
import React, { Fragment } from "react";
import { Tabs } from "antd";
import Admin from "components/documentation/admin";
import Doctor from "components/documentation/doctor";
import CoAdmin from "components/documentation/coAdmin";
import Receptionist from "components/documentation/receptionist";
import Pharmacist from "components/documentation/pharmacist";
import InventoryManager from "components/documentation/inventoryManager";

const Learn = () => {
  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        centered
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "stretch",
          minHeight: "calc(100vh - 200px)",
        }}
        items={[
          {
            key: "1",
            label: "App Overview",
            children: <MindMapGraph />,
          },
          {
            key: "2",
            label: "Admin",
            children: <Admin />,
          },
          {
            key: "3",
            label: "Co Admin",
            children: <CoAdmin />,
          },
          {
            key: "4",
            label: "Doctor",
            children: <Doctor />,
          },
          {
            key: "5",
            label: "Receptionist",
            children: <Receptionist />,
          },
          {
            key: "6",
            label: "Pharmacist",
            children: <Pharmacist />,
          },
          {
            key: "7",
            label: "Inventory Manager",
            children: <InventoryManager />,
          },
        ]}
      />
    </Fragment>
  );
};

export default Learn;
