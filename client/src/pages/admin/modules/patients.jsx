import faker from "@faker-js/faker";
import { Table } from "antd";
import React from "react";

const GenerateData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      name: faker.name.findName(),
      mobile: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      lastVisit: faker.date.past().toDateString(),
    });
  }
  return data;
};

const Patients = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Visit",
      dataIndex: "lastVisit",
      key: "lastVisit",
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

export default Patients;
