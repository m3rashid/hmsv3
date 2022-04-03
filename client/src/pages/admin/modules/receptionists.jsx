import faker from "@faker-js/faker";
import { Button, Space, Table } from "antd";
import React from "react";

const GenerateData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: faker.name.findName(),
      joined: faker.date.past().toDateString(),
      deskNumber: faker.random.number(),
    });
  }
  return data;
};

const Receptionists = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Desk Number",
      dataIndex: "deskNumber",
      key: "deskNumber",
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
      }}
    >
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

export default Receptionists;
