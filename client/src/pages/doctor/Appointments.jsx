import React, { useCallback, useEffect, useState } from "react";
import { socket } from "../../api/socket";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atoms/auth";
import { doctorState } from "../../atoms/doctor";
import { Button, Modal, Space, Table, Typography } from "antd";
// import { useQuery } from "react-query";
// import { instance } from "../../../api/instance";

function DoctorAppointments() {
  // const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useRecoilState(doctorState);
  const { user } = useRecoilValue(authState);
  const [ModalVisible, setModalVisible] = useState({
    visible: false,
    id: null,
    data: {},
  });

  const loadInitialData = useCallback(() => {}, []);

  useEffect(() => {}, []);

  const ToggleModal = () => {
    setModalVisible({
      ...ModalVisible,
      visible: !ModalVisible.visible,
    });
  };

  useEffect(() => {
    socket.emit("get-doctor-appointments", {
      doctorId: user.id,
    });
  }, [user.id]);

  const columns = [
    {
      title: "PatientName",
      dataIndex: "patientname",
      key: "patientname",
      sorter: (a, b) => a?.patient?.name?.localeCompare(b.patientname),
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
          <Button
            onClick={() => {
              console.log(record);
              setModalVisible({
                visible: true,
                id: record.id,
                data: record,
              });
            }}
          >
            {" "}
            View Form{" "}
          </Button>
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
      <Typography.Title
        level={4}
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Doctor Appointments
      </Typography.Title>
      <Table
        dataSource={doctorData.appointments}
        columns={columns}
        pagination={{
          total: doctorData.appointments.length,
          defaultPageSize: 5,
        }}
      />

      <Modal
        visible={ModalVisible.visible}
        onOk={ToggleModal}
        onCancel={ToggleModal}
        footer={[
          <Button key="back" onClick={ToggleModal}>
            Close
          </Button>,
        ]}
      >
        <div>
          <p>
            <strong>Date and Time: </strong>
            {ModalVisible.data?.date}
          </p>
          <div>
            <h4>
              <strong>Patient Info </strong>
            </h4>
            <Space
              direction="vertical"
              size={3}
              style={{
                padding: "10px",
              }}
            >
              <div>
                <strong>Name: </strong>
                {ModalVisible.data?.patientname}
              </div>
              <div>
                <strong>Age: </strong>
                {ModalVisible.data?.Patient?.age}
              </div>
              <div>
                <strong>Email:</strong>
                {ModalVisible.data?.Patient?.email}
              </div>
            </Space>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DoctorAppointments;
