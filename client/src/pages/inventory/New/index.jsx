import React from "react";
import { Divider } from "antd";
import Header from "../../../components/Header";
import InventoryFormHandler from "../../../components/Inventory/FormHandler";

const AddNewInventory = () => {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Header />
      <Divider />
      <InventoryFormHandler />
    </div>
  );
};

export default AddNewInventory;
