import faker from "@faker-js/faker";
import React from "react";
import {
  Form,
  Button,
  Radio,
  Input,
  InputNumber,
  Space,
  Table,
  PageHeader,
} from "antd";
const { TextArea } = Input;

const GenerateData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: faker.name.findName(),
      designation: faker.name.jobTitle(),
      joined: faker.date.past().toDateString(),
    });
  }
  return data;
};

const Doctors = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button> Details </Button>
        </Space>
      ),
    },
  ];

  const data = GenerateData(10);

  return (
    <div
      style={{
        marginTop: "20px",
        marginLeft: "0px",
      }}
    >
      <div>
        <PageHeader title="Register a Doctor" subTitle="" />

        <Form labelAlign="left" labelCol={{ span: 2 }} wrapperCol={{ span: 4 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Enter a name!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please Enter an email!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please Enter a password!" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2 }}>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          total: data.length,
          defaultPageSize: 5,
        }}
      />
    </div>
  );
};

export default Doctors;
