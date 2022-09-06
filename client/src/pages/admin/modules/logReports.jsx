import React from "react";
import { Button, Space, Table } from "antd";

const LogReports = () => {
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slNo",
      render: (_, __, index) => index + 1,
    },
  ];

  return <div style={{ marginTop: "20px" }}></div>;
};

export default LogReports;
