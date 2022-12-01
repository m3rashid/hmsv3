import React from "react";
import { Button, Space, Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";

const Patients = () => {
  const { getAllUsers, users, RefreshUserButton, getSinglePatientDetail } =
    useGetUserDetail({
      userType: "patients",
      userRole: "PATIENT",
    });

  React.useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Mobile No.",
      dataIndex: "contact",
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
      render: (text) => <span>{text ?? "No Visit"}</span>,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <Space>
            <Button onClick={() => getSinglePatientDetail(record.id)}>
              Details
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Table
        dataSource={users}
        columns={columns}
        pagination={{
          total: users.length,
          defaultPageSize: 10,
        }}
      />
    </AdminWrapper>
  );
};

export default Patients;
