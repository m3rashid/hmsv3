import React from "react";
import { Divider, message } from "antd";
import Header from "../../../components/Header";
import InventoryFormHandler from "../../../components/Inventory/FormHandler";
import { instance } from "../../../api/instance";
import { useRecoilState } from "recoil";
import { inventoryState } from "../../../atoms/inventory";

const AddNewInventory = () => {
  const [inventoryData, setInventoryData] = useRecoilState(inventoryState);

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

      console.log(res);
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
