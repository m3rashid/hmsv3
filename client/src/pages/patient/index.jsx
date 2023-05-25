import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState, Fragment } from "react";
import { Row, Col, Typography, Divider, Button, Table, Drawer } from "antd";

import { instance } from "api/instance";
import Loading from "components/Loading/Loading";
import styles from "pages/patient/styles.module.css";
import DoctorDisplay from "components/Doctor/DoctorDisplay";
import PrescriptionDisplay from "components/Prescription/PrescriptionDisplay";
import useTableStyles from "components/common/tableDefaults";

const PatientInfo = (props) => {
  const { tableStyles } = useTableStyles();
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["patient", id, props],
    async () => {
      const { data } = await instance.get(`/patient/${id || props.id}`);
      const patient = data.patient;

      patient.Appointment = patient.Appointment.sort((a, b) =>
        dayjs(b.date).diff(a.date)
      );
      return patient;
    }
  );

  const [PrescriptionModal, setPrescriptionModal] = useState({
    visible: false,
    data: {},
  });

  const [DoctorModal, setDoctorModal] = useState({
    visible: false,
    data: {},
  });

  const InfoSchema = useMemo(
    () => [
      { title: "ID No.", dataIndex: "id" },
      { title: "Name", dataIndex: "name" },
      { title: "Age", dataIndex: "age" },
      { title: "Address", dataIndex: "address" },
      { title: "Contact", dataIndex: "contact" },
      { title: "Email", dataIndex: "email" },
      { title: "Sex", dataIndex: "sex" },
    ],
    []
  );

  const PrescriptionModalHandler = useCallback(
    (item) => () => {
      setPrescriptionModal(() => {
        const state = {
          visible: true,
          data: item,
        };

        state.data.medicines = state.data.medicines.map((medicine) => ({
          ...medicine,
          ...medicine?.Medicine,
        }));

        return state;
      });
    },
    [setPrescriptionModal]
  );

  // Schema For Appointment Info
  const AppointmentSchema = useMemo(
    () => [
      {
        title: "Appointment ID.",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Appointment Date",
        dataIndex: "datePrescribed",
        key: "datePrescribed",
        render: (date) => dayjs(date).format("MMMM DD YYYY"), // Format date to "MMMM Do YYYY"
      },
      {
        title: "Remarks",
        dataIndex: "remarks",
        key: "remarks",
        render: (remarks) => remarks || "No Remarks", // If no remarks, display "No Remarks"
      },
      {
        title: "Doctor's Name",
        dataIndex: "doctor",
        key: "doctor",
        render: (doctor) => (
          <Button
            type="link"
            onClick={() =>
              setDoctorModal({
                visible: true,
                data: doctor,
              })
            }
          >
            {doctor.authorityName}
          </Button>
        ),
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (_, record) => (
          <Fragment>
            <Button
              onClick={PrescriptionModalHandler(record.Prescription[0])}
              disabled={!record.Prescription[0]}
            >
              {record.Prescription[0] ? "View Prescription" : "No Prescription"}
            </Button>
          </Fragment>
        ),
      },
    ],
    [PrescriptionModalHandler]
  );

  if (isLoading || isError) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Divider>
        <Typography.Title level={3}>Patient's Info</Typography.Title>
      </Divider>
      <Col span={24}>
        {data &&
          InfoSchema.map((item, index) => {
            if (!data[item.dataIndex]) return null;
            return (
              <Row
                span={12}
                key={index}
                className={styles.info__schema__container}
              >
                <Col span={5} className={styles.patient__info__header}>
                  <Typography.Text>{item.title}</Typography.Text>
                </Col>
                <Col span={6}>
                  <Typography.Text>{data[item.dataIndex]}</Typography.Text>
                </Col>
              </Row>
            );
          })}
      </Col>
      <Divider>Patient's History</Divider>
      <Table
        rowKey={(record) => record.id}
        style={{ tableStyles }}
        size="small"
        columns={AppointmentSchema}
        dataSource={data.Appointment}
      />
      <Drawer
        open={PrescriptionModal.visible}
        width={"40%"}
        onClose={() => setPrescriptionModal({ visible: false })}
      >
        <PrescriptionDisplay
          ExtraMedicines={PrescriptionModal?.data?.CustomMedicines}
          Medicines={PrescriptionModal?.data?.medicines}
          date={PrescriptionModal?.data?.date}
          symptoms={PrescriptionModal?.data?.symptoms}
          id={PrescriptionModal?.data?.appointmentId}
          patient={data}
        />
      </Drawer>
      <Drawer
        open={DoctorModal.visible}
        okButtonProps={{
          style: { display: "none" },
        }}
        onClose={() => setDoctorModal({ visible: false, data: {} })}
        title="Doctor's Info"
      >
        <DoctorDisplay doctor={DoctorModal.data} />
      </Drawer>
    </div>
  );
};

export default PatientInfo;
