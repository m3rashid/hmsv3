import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tabs, Spin } from "antd";

import { pharmacyState } from "../../atoms/pharmacy";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { instance } from "../../api/instance";
import { getEstimatedMedRequirement } from "./helpers/functions";
import Header from "../../components/Header";
const { TabPane } = Tabs;

function Prescriptions() {
  const [online, setOnline] = React.useState(true);
  const pharmacyData = useRecoilValue(pharmacyState);
  const navigate = useNavigate();
  const [ModalVisible, setModalVisible] = React.useState({
    visible: false,
    id: null,
    data: {},
  });

  const ToggleModal = () => {
    setModalVisible({
      ...ModalVisible,
      visible: !ModalVisible.visible,
    });
  };

  const pendingColumns = [
    {
      title: "PatientName",
      dataIndex: "appointment.patient.name",
      key: "appointment.patient.name",
      render: (text, record) => {
        return <span>{record.appointment.patient.name}</span>;
      },
    },
    {
      title: "DoctorName",
      dataIndex: "appointment.doctor.name",
      key: "appointment.doctor.name",
      render: (text, record) => {
        return <span>{record.appointment.doctor?.Auth[0].name}</span>;
      },
    },
    {
      title: "Date/Time",
      dataIndex: "datePrescribed",
      key: "datePrescribed",
      render: (text, record) => {
        return (
          <span>
            {dayjs(record.datePrescribed).format("DD/MM/YYYY hh:mm a")}
          </span>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              setModalVisible({
                visible: true,
                id: record.id,
                data: record,
              });
            }}
          >
            View Prescriptions
          </Button>
          {/* <Popconfirm
            title="Create a prescription for this appointment?"
            onConfirm={() => {
              navigate(`/pharmacy/receipt?prescriptionId=${record.id}`);
            }}
            okText="Yes"
            cancelText="Cancel"
          > */}
          <Button
            onClick={() => {
              navigate(`/pharmacy/receipt?prescriptionId=${record.id}`);
            }}
          >
            Dispense
          </Button>
          {/* </Popconfirm> */}
        </Space>
      ),
    },
  ];

  const processedColumns = [
    {
      title: "PatientName",
      dataIndex: "appointment.patient.name",
      key: "appointment.patient.name",
      render: (text, record) => {
        return <span>{record.appointment.patient.name}</span>;
      },
    },
    {
      title: "DoctorName",
      dataIndex: "appointment.doctor.name",
      key: "appointment.doctor.name",
      render: (text, record) => {
        return <span>{record.appointment.doctor?.Auth[0].name}</span>;
      },
    },
    {
      title: "Date/Time",
      dataIndex: "datePrescribed",
      key: "datePrescribed",
      render: (text, record) => {
        return (
          <span>
            {dayjs(record.datePrescribed).format("DD/MM/YYYY hh:mm a")}
          </span>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              setModalVisible({
                visible: true,
                id: record.id,
                data: record,
              });
            }}
          >
            View Prescription
          </Button>
          <Button>Show Receipt</Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Header online={online} setOnline={setOnline} />
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Active" key="1">
          <Table
            dataSource={pharmacyData.prescriptions.filter(
              (prsp) => prsp.pending
            )}
            columns={pendingColumns}
          />
        </TabPane>
        <TabPane tab="Completed" key="2">
          <Table
            dataSource={pharmacyData.prescriptions.filter(
              (prsp) => !prsp.pending
            )}
            columns={processedColumns}
          />
        </TabPane>
      </Tabs>

      <Modal
        visible={ModalVisible?.visible}
        onOk={ToggleModal}
        onCancel={ToggleModal}
        footer={[
          <Button key="back" onClick={ToggleModal}>
            Close
          </Button>,
        ]}
      >
        <ViewPrescriptionModal prescriptionId={ModalVisible.id} />
      </Modal>
    </React.Fragment>
  );
}

const ViewPrescriptionModal = ({ prescriptionId }) => {
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        setLoading(true);
        const resp = await instance.get(
          `/pharmacy/prescriptions/${prescriptionId}`
        );
        setPrescriptionData(resp.data?.prescription);
      } catch (error) {
        message.error("Unknown error, check console.");
      } finally {
        setLoading(false);
      }
    };
    if (prescriptionId) asyncFetch();
  }, [prescriptionId]);

  const medicineTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <span>{record.Medicine.name}</span>,
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => <span>{text} days</span>,
    },
    {
      title: "Estimated Requirement",
      dataIndex: "required",
      key: "required",
      render: (text, record) => (
        <span>
          {getEstimatedMedRequirement({
            duration: record.duration,
            dosage: record.dosage,
          })}
        </span>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      {prescriptionData && (
        <div>
          {prescriptionData?.datePrescribed && (
            <p>
              <strong>Date and Time: </strong>
              {dayjs(prescriptionData?.datePrescribed).format(
                "DD/MM/YYYY, HH:MM a"
              )}
            </p>
          )}

          <div>
            <h4>
              <strong>Prescription Info </strong>
            </h4>
            <Space direction="vertical" size={3} style={{ padding: "10px" }}>
              {prescriptionData.appointment?.patient?.name && (
                <div>
                  <strong>Patient Name: </strong>
                  {prescriptionData.appointment?.patient?.name}
                </div>
              )}

              <div>
                <strong>Doctor Name: </strong>
                {prescriptionData.appointment?.doctor?.Auth[0]?.name}
              </div>
              {prescriptionData.medicines && (
                <div>
                  <strong>Medicines: </strong>
                  <Table
                    size="small"
                    columns={medicineTableColumns}
                    dataSource={prescriptionData.medicines}
                  />
                </div>
              )}

              <div>
                <strong>Custom Medicines: </strong>
              </div>
            </Space>
          </div>
        </div>
      )}
    </Spin>
  );
};
export default Prescriptions;
