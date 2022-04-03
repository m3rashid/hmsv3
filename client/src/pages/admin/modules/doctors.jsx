import faker from "@faker-js/faker";
import { Table } from "antd";
import React from "react";

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

export default Doctors;
