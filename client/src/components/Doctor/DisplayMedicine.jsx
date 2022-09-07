import React from "react";
import dayjs from "dayjs";
import { Space, Typography, Card, Table, Tooltip } from "antd";
import PropTypes from "prop-types";
import SingleMedicine from "../../pages/doctor/helpers/singleMedicine";
import { getEstimatedMedRequirement } from "../../pages/pharmacy/helpers/functions";
import { AiOutlineCheck, AiOutlineWarning } from "react-icons/ai";

function DisplayMedicine({
  patient,
  date,
  id,
  symptoms,
  Medicines,
  ExtraMedicines,
}) {
  return (
    <React.Fragment>
      <Typography.Title level={4}>Prescription Preview</Typography.Title>
      <Card title="Appointment Details" style={{ background: "transparent" }}>
        <Space direction="vertical">
          <Typography.Text>Appointment ID: {id}</Typography.Text>
          <Typography.Text>Patient Name: {patient?.name}</Typography.Text>
          <Typography.Text>
            Date: {dayjs(date).format("MMMM DD YYYY HH:mm A")}
          </Typography.Text>
        </Space>
      </Card>
      <Space
        direction="vertical"
        style={{
          marginLeft: 20,
          padding: 20,
          width: "75%",
          borderRadius: 15,
          backgroundColor: "#fff",
        }}
      >
        <Typography.Text type="success">Symptoms:</Typography.Text>
        <Typography.Text>{symptoms}</Typography.Text>
      </Space>

      <ViewPrescriptionModal prescriptionData={Medicines} />

      <Card title="Custom Medicines" style={{ background: "transparent" }}>
        <Space direction="vertical" size={"large"}>
          {ExtraMedicines?.map((medicine, index) => (
            <SingleMedicine
              key={index}
              index={index}
              medicine={medicine}
              isExtra={true}
            />
          ))}
        </Space>
      </Card>
    </React.Fragment>
  );
}

DisplayMedicine.propTypes = {
  patient: PropTypes.object,
  date: PropTypes.string,
  id: PropTypes.any,
  symptoms: PropTypes.string,
  Medicines: PropTypes.array,
  ExtraMedicines: PropTypes.array,
};

export default DisplayMedicine;

const ViewPrescriptionModal = ({ prescriptionData }) => {
  const medicineTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <span>{record?.medicine?.name}</span>,
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
      title: "Requirement",
      dataIndex: "required",
      key: "required",
      render: (text, record) => <span>{record.quantityRequired} Tablets</span>,
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (text, record) => {
        const availability =
          record?.medicine?.quantity >= record.quantityRequired;

        return (
          <Typography style={{ textAlign: "center" }}>
            {availability ? (
              <Tooltip title="Available" color="green" placement="right">
                <AiOutlineCheck style={{ color: "green" }} />
              </Tooltip>
            ) : (
              <Tooltip title="Not Available" color="orange" placement="right">
                <AiOutlineWarning style={{ color: "orange" }} />
              </Tooltip>
            )}
          </Typography>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size={3} style={{ padding: "10px" }}>
      {prescriptionData && (
        <Table
          size="small"
          columns={medicineTableColumns}
          dataSource={prescriptionData}
        />
      )}
    </Space>
  );
};
