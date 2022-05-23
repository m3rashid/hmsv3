import React, { useEffect, useState } from "react";
import { socket } from "../../../api/socket";
import { useRecoilValue } from "recoil";
import { authState } from "../../../atoms/auth";
import { Button, Space, Table } from "antd";

function Appointments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useRecoilValue(authState);

  useEffect(() => {
    socket.emit("get-doctor-appointments", {
      doctorId: user.id,
    });
  }, [user.id]);

  useEffect(() => {
    socket.on("found-doctor-appointments", (data) => {
      const { doctorId, appointments } = data;
      console.log(appointments);
      setData(appointments);
      setLoading(false);
    });
    return () => {
      socket.off("found-doctor-appointments");
    };
  }, []);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button> View Form </Button>
        </Space>
      ),
    },
  ];

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
}

export default Appointments;
