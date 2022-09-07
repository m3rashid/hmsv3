import dayjs from "dayjs";
import React from "react";
import { Table, Tabs } from "antd";

import AdminWrapper from "../adminWrapper";
import useLogReports from "./helpers/useLogReports";
import { toSentenceCase } from "../../../utils/strings";

const LogReports = () => {
  const { getLogs, allLogs } = useLogReports();

  React.useEffect(() => {
    getLogs().then().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "slNo",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text) => toSentenceCase(text),
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
  ];

  if (Object.keys(allLogs).length === 0) {
    return <AdminWrapper>No data</AdminWrapper>;
  }

  return (
    <AdminWrapper>
      <Tabs defaultActiveKey="1">
        {Object.keys(allLogs).forEach((e, index) => {
          console.log({
            "allLogs[e]": allLogs[e],
          });
          return (
            <div key={e}>
              <Table
                dataSource={allLogs[e]}
                columns={columns}
                pagination={{
                  total: allLogs[e].length,
                  defaultPageSize: 5,
                }}
              />
            </div>
          );
        })}
      </Tabs>
    </AdminWrapper>
  );
};

export default LogReports;
