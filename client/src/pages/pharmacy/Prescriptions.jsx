import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tabs, Spin, Drawer } from "antd";

import { pharmacyState } from "../../atoms/pharmacy";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { instance } from "../../api/instance";
import { getEstimatedMedRequirement } from "./helpers/functions";
import Header from "../../components/Header";
import DisplayMedicine from "../../components/Doctor/DisplayMedicine";
import ShowReceipt from "./ShowReciept";
const { TabPane } = Tabs;

function Prescriptions() {
  const [online, setOnline] = React.useState(true);
  const pharmacyData = useRecoilValue(pharmacyState);
  const navigate = useNavigate();
  const [ModalVisible, setModalVisible] = React.useState({
    visible: false,
    id: null,
    type: null,
    data: {},
  });

  const ToggleModal = () => {
    setModalVisible({
      ...ModalVisible,
      visible: !ModalVisible.visible,
    });
  };

  const ShowPrescriptionHandler = useCallback(async (record, type) => {
    try {
      const { data } = await instance.get(
        `/pharmacy/prescriptions/${record.id}`
      );

      console.log("Show Prescription", data);

      setModalVisible({
        visible: true,
        id: record.id,
        type: type,
        data: data.prescription,
      });
    } catch (err) {
      message.error("Error Occurred While Fetching");
    }
  }, []);

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
              ShowPrescriptionHandler(record, "prescription");
            }}
          >
            View Prescriptions
          </Button>
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
              ShowPrescriptionHandler(record, "prescription");
            }}
          >
            View Prescription
          </Button>
          <Button
            onClick={() => {
              ShowPrescriptionHandler(record, "receipt");
            }}
          >
            Show Receipt
          </Button>
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
      <Drawer
        visible={ModalVisible?.visible}
        onOk={ToggleModal}
        onClose={ToggleModal}
        footer={[
          <Button key="back" onClick={ToggleModal}>
            Close
          </Button>,
        ]}
        width={1000}
      >
        {ModalVisible?.type === "prescription" ? (
          <DisplayMedicine
            id={ModalVisible?.data?.appointmentId}
            ExtraMedicines={ModalVisible?.data?.CustomMedicines}
            Medicines={ModalVisible?.data?.medicines}
            date={ModalVisible?.data?.createdAt}
            patient={ModalVisible?.data?.appointment?.patient}
            symptoms={ModalVisible?.data?.symptoms}
          />
        ) : (
          <ShowReceipt
            data={[
              {
                ...ModalVisible?.data,
                date: dayjs(ModalVisible?.data?.datePrescribed).format(
                  "MMMM DD YYYY HH:mm A"
                ),
              },
            ]}
          />
        )}
      </Drawer>
    </React.Fragment>
  );
}

// const ViewPrescriptionModal = ({ prescriptionId }) => {
//   const [prescriptionData, setPrescriptionData] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const asyncFetch = async () => {
//       try {
//         setLoading(true);
//         const resp = await instance.get(
//           `/pharmacy/prescriptions/${prescriptionId}`
//         );
//         setPrescriptionData(resp.data?.prescription);
//       } catch (error) {
//         message.error("Unknown error, check console.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (prescriptionId) asyncFetch();
//   }, [prescriptionId]);

//   const medicineTableColumns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => <span>{record.medicine.name}</span>,
//     },
//     {
//       title: "Dosage",
//       dataIndex: "dosage",
//       key: "dosage",
//       render: (text) => <span>{text}</span>,
//     },
//     {
//       title: "Duration",
//       dataIndex: "duration",
//       key: "duration",
//       render: (text) => <span>{text} days</span>,
//     },
//     {
//       title: "Estimated Requirement",
//       dataIndex: "required",
//       key: "required",
//       render: (text, record) => (
//         <span>
//           {getEstimatedMedRequirement({
//             duration: record.duration,
//             dosage: record.dosage,
//           })}
//         </span>
//       ),
//     },
//   ];

//   return (
//     <Spin spinning={loading}>
//       {prescriptionData && (
//         <div>
//           {prescriptionData?.datePrescribed && (
//             <p>
//               <strong>Date and Time: </strong>
//               {dayjs(prescriptionData?.datePrescribed).format(
//                 "DD/MM/YYYY, HH:MM a"
//               )}
//             </p>
//           )}

//           <div>
//             <h4>
//               <strong>Prescription Info </strong>
//             </h4>
//             <Space direction="vertical" size={3} style={{ padding: "10px" }}>
//               {prescriptionData.appointment?.patient?.name && (
//                 <div>
//                   <strong>Patient Name: </strong>
//                   {prescriptionData.appointment?.patient?.name}
//                 </div>
//               )}

//               <div>
//                 <strong>Doctor Name: </strong>
//                 {prescriptionData.appointment?.doctor?.Auth[0]?.name}
//               </div>
//               {prescriptionData.medicines && (
//                 <div>
//                   <strong>Medicines: </strong>
//                   <Table
//                     size="small"
//                     columns={medicineTableColumns}
//                     dataSource={prescriptionData.medicines}
//                   />
//                 </div>
//               )}

//               <div>
//                 <strong>Custom Medicines: </strong>
//               </div>
//             </Space>
//           </div>
//         </div>
//       )}
//     </Spin>
//   );
// };
export default Prescriptions;
