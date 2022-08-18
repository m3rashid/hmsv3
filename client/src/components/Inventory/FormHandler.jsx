import React, { useState } from "react";
import {
  Form,
  Button,
  AutoComplete,
  message,
  Typography,
  Col,
  Input,
  Space,
  Card,
  Divider,
  Select,
  DatePicker,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { instance } from "../../api/instance";
import axios from "axios";
import { Category, InventoryTypes, MedType } from "../../utils/inventoryTypes";
import { useRecoilValue } from "recoil";
import { inventoryState } from "../../atoms/inventory";
import PropTypes from "prop-types";

function InventoryFormHandler(props) {
  const [itemlist, setItemlist] = useState({
    data: [],
    cancelToken: undefined,
  });
  const inventory = useRecoilValue(inventoryState);
  const [Search, setSearch] = useState({
    name: [],
  });
  const [FormSelected, setFormSelected] = useState({
    item: null,
    type: props?.type,
  });
  const [form] = Form.useForm();

  const formSubmitHandler = async (values) => {
    console.log(values, FormSelected);
    try {
      const res = await instance.post("/inventory/add", {
        name: values.name,
        quantity: parseInt(values.quantity),
        price: parseInt(values.price),
        description: values.description,
      });

      setFormSelected({});

      if (res.status === 200) {
        message.success("Medicine added");
        form.resetFields();
      }
    } catch (err) {
      console.error(err);
      message.error("Error");
    }
  };

  const UpdateMedicine = async (value) => {
    if (itemlist.cancelToken) {
      itemlist.cancelToken.cancel();
    }

    try {
      const CancelToken = axios.CancelToken.source();

      setItemlist({
        data: [
          {
            value: "",
            label: "Loading..",
          },
        ],
        cancelToken: CancelToken,
      });

      const { data } = await instance.get("/inventory/search", {
        params: {
          name: value,
        },
      });

      setItemlist({
        ...itemlist,
        data: data.inventory.map((item) => {
          return {
            value: item.id,
            data: item,
            label: (
              <Col
                direction="vertical"
                size={"small"}
                style={{
                  fontSize: 12,
                }}
              >
                <Typography.Text>{item.name}</Typography.Text>
              </Col>
            ),
          };
        }),
        cancelToken: itemlist.cancelToken || CancelToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchMedicineName = (value) => {
    console.log(inventory, FormSelected.type);
    const searchData = inventory[`${FormSelected.type}`].inventory
      .filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })
      .map((item) => ({
        value: item.name,
        data: item,
        label: item.name,
      }));

    setSearch({
      ...Search,
      name: searchData,
    });
  };

  console.log(FormSelected);

  return (
    <React.Fragment>
      <Form
        form={form}
        onFinish={formSubmitHandler}
        labelAlign="left"
        labelCol={{ span: props?.Col?.label || 4 }}
        wrapperCol={{ span: props?.Col?.wrapper || 8 }}
        initialValues={{
          ...props?.defaultValues,
          expiry_date: moment(props?.defaultValues?.expiry_date, "YYYY-MM-DD"),
        }}
      >
        <Form.Item
          label="Inventory Type"
          name="type"
          style={{
            display: FormSelected.type ? "none" : "block",
          }}
        >
          <Select
            placeholder="Select Inventory Type"
            onChange={(value) => {
              setFormSelected({
                ...FormSelected,
                type: value,
              });
            }}
          >
            {Object.keys(InventoryTypes).map((item) => (
              <Select.Option key={item} value={item} />
            ))}
          </Select>
        </Form.Item>
        <div
          style={{
            display: FormSelected.type ? "block" : "none",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the medicine!",
              },
            ]}
          >
            <AutoComplete
              onSearch={onSearchMedicineName}
              allowClear
              options={Search.name}
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please input the name of the medicine!",
              },
            ]}
          >
            <Input placeholder="Enter Quantity" type={"number"} />
          </Form.Item>
        </div>
        <div
          style={{
            display:
              FormSelected.type === InventoryTypes.Medicine ||
              FormSelected.type === InventoryTypes.NonMedicine
                ? "block"
                : "none",
          }}
        >
          <Form.Item
            label="Batch Number"
            name="batchNumber"
            rules={[
              {
                required:
                  FormSelected.type === InventoryTypes.Medicine ||
                  FormSelected.type === InventoryTypes.NonMedicine,
                message: "Please input the batch number!",
              },
            ]}
          >
            <Input placeholder="Enter Batch Number" />
          </Form.Item>
          <Form.Item
            label="Expiry Date"
            name="expiry_date"
            rules={[
              {
                required:
                  FormSelected.type === InventoryTypes.Medicine ||
                  FormSelected.type === InventoryTypes.NonMedicine,
                message: "Please input the expiry date!",
              },
            ]}
          >
            <DatePicker placeholder="Enter Expiry Date" type="date" />
          </Form.Item>
        </div>

        <div
          style={{
            display:
              FormSelected.type === InventoryTypes.Medicine ? "block" : "none",
          }}
        >
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: FormSelected.type === InventoryTypes.Medicine,
                message: "Please input the category!",
              },
            ]}
          >
            <Select
              placeholder="Select Category"
              options={Object.keys(Category).map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Medicine Type"
            name="medType"
            rules={[
              {
                required: FormSelected.type === InventoryTypes.Medicine,
                message: "Please input the medicine type!",
              },
            ]}
          >
            <Select
              placeholder="Select Medicine Type"
              options={Object.keys(MedType).map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </Form.Item>
        </div>

        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!FormSelected.type}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

InventoryFormHandler.propTypes = {
  defaultValues: PropTypes.object,
  type: PropTypes.string,
  Col: PropTypes.shape({
    label: PropTypes.number,
    wrapper: PropTypes.number,
  }),
};

export default InventoryFormHandler;