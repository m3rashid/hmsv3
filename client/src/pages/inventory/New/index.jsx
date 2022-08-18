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
} from "antd";
import { instance } from "../../../api/instance";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import Header from "../../../components/Header";

const AddNewInventory = () => {
  const [itemlist, setItemlist] = useState({
    data: [],
    cancelToken: undefined,
  });
  const [FormSelected, setFormSelected] = useState({
    item: null,
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

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Header />
      <Divider />
      <Form
        form={form}
        onFinish={formSubmitHandler}
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          label="Item Name"
          name="name"
          rules={[{ required: true, message: "Please select an item!" }]}
        >
          <AutoComplete
            options={itemlist.data}
            id="name"
            placeholder="Item Name"
            onSearch={(value) => UpdateMedicine(value)}
            onSelect={(value) => {
              console.log(value);
              const item = itemlist.data.find((item) => item.value === value);
              form.setFieldValue("name", item.data.name);
              setFormSelected({
                ...FormSelected,
                item: item,
              });
            }}
            onChange={(value) => {
              console.log({ value });
              if (value === "") {
                form.setFieldValue("name", "");
                setFormSelected({
                  ...FormSelected,
                  item: null,
                });
              } else {
                const item = itemlist.data.find(
                  (doctor) => doctor.value === value
                );
                console.log(item?.data?.name || value);
                form.setFieldValue("name", item?.data?.name || value);

                setFormSelected({
                  ...FormSelected,
                  item: itemlist.data.find(
                    (doctor) => doctor.value === parseInt(value)
                  ),
                });
              }
            }}
            onClear={() => {
              setFormSelected({
                ...FormSelected,
                item: null,
              });
            }}
          />
          <Typography.Title
            disabled
            style={{
              fontSize: 10,
            }}
          >
            *Search by name
          </Typography.Title>
        </Form.Item>

        {FormSelected.item && (
          <Card title={FormSelected.item?.data?.name} bordered>
            <Space direction="vertical">
              <Typography.Text type="danger">
                ID : {FormSelected.item?.data?.id}
              </Typography.Text>
              <Typography.Text
                style={{
                  opacity: 0.8,
                }}
              >
                {FormSelected.item?.data?.description}
              </Typography.Text>
            </Space>
          </Card>
        )}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <Input placeholder="Price" name="price" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter quantity!" }]}
        >
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewInventory;
