import dayjs from "dayjs";
import React from "react";
import { Button, Modal, Table } from "antd";

import AdminWrapper from "../adminWrapper";
import useLogReports from "./helpers/useLogReports";
import { toSentenceCase } from "../../../utils/strings";

const LogReports = () => {
  const {
    getLogs,
    allLogs,
    getDetails,
    handleCancel,
    handleOk,
    isModalVisible,
    details,
  } = useLogReports();

  React.useEffect(() => {
    getLogs().then().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) =>
        text
          .split("_")
          .map((e) => toSentenceCase(e))
          .join(" "),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => dayjs(text).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => getDetails(record)}>Details</Button>
      ),
    },
  ];

  if (Object.keys(allLogs).length === 0) {
    return <AdminWrapper>No data</AdminWrapper>;
  }

  return (
    <AdminWrapper>
      <Table
        dataSource={allLogs}
        columns={columns}
        pagination={{
          total: allLogs.length,
          defaultPageSize: 10,
        }}
      />
      <Modal
        title="Details"
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {JSON.stringify(details, null, 2)}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            borderTop: "1px solid #f0f0f0",
            margin: "24px -24px -10px -24px",
            padding: "10px 24px 0 24px",
          }}
        >
          <Button style={{ marginRight: "10px" }} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Modal>
    </AdminWrapper>
  );
};

export default LogReports;
