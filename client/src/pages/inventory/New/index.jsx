import React from "react";
import { Divider, message } from "antd";
import { useSetRecoilState } from "recoil";

import Header from "../../../components/Header";
import { instance } from "../../../api/instance";
import { inventoryState } from "../../../atoms/inventory";
import InventoryFormHandler from "../../../components/Inventory/FormHandler";

const AddNewInventory = () => {
  const setInventoryData = useSetRecoilState(inventoryState);

  const formSubmitHandler = async (data) => {
    try {
      const { values, form } = data;
      const res = await instance.post("/inventory/add", {
        type: values.type,
        data: {
          ...values,
          type: undefined,
          quantity: parseInt(values.quantity),
        },
      });

      message.success("New Inventory Added");

      setInventoryData((prevState) => {
        return {
          ...prevState,
          [values.type]: {
            ...prevState[values.type],
            inventory: [...prevState[values.type].inventory, res.data.data],
          },
        };
      });
      form?.resetFields();
    } catch (err) {
      message.error("Error");
      throw new Error(err || "Error");
    }
  };

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Header />
      <Divider />
      <InventoryFormHandler formSubmit={formSubmitHandler} />
    </div>
  );
};

export default AddNewInventory;
