import { useRecoilValue } from "recoil";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";

import { socket } from "api/instance";
import { authState } from "atoms/auth";
import useTableStyles from "components/common/tableDefaults";

const DoctorPatients = () => {
  const { tableStyles } = useTableStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useRecoilValue(authState);

  useEffect(() => {
    socket.emit("get-doctor-patients", {
      doctorId: user.id,
    });
  }, [user.id]);

  useEffect(() => {
    socket.on("found-doctor-patients", (data) => {
      const { patients } = data;
      setData(patients);
      setLoading(false);
    });
    return () => {
      socket.off("found-doctor-patients");
    };
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
    {
      title: "Prescription",
      dataIndex: "prescription",
      key: "prescription",
      width: "45%",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button>Consult</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        rowKey={(record) => record.id}
        style={{ ...tableStyles }}
        size="small"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ total: data.length, defaultPageSize: 5 }}
      />
    </div>
  );
};

export default DoctorPatients;
