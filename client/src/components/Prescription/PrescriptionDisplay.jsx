import { Fragment } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Space, Typography, Card, Table, Tooltip, Divider } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import ShowEntry from "components/common/showEntry";

/**
 * Display Prescription of a patient
 * @returns
 */
function PrescriptionDisplay({
  patient,
  date,
  id,
  symptoms,
  Medicines,
  ExtraMedicines,
  showAvailability,
}) {
  return (
    <Fragment>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={4}>Prescription Preview</Typography.Title>
        <Card size="small" title="Appointment Details">
          <Space direction="vertical">
            {id && <ShowEntry label="Appointment ID" value={id} />}
            {patient?.name && (
              <ShowEntry label="Patient Name" value={patient?.name} />
            )}
            <ShowEntry
              label="Date"
              value={dayjs(date).format("MMMM DD YYYY HH:mm A")}
            />
          </Space>
        </Card>

        <Card size="small" title="Symptoms">
          {symptoms && <Typography.Text>{symptoms}</Typography.Text>}
        </Card>

        <Divider />

        <div className="user-table">
          <Typography.Title level={4} strong>
            Medicines
          </Typography.Title>
          <br />
          <ViewPrescriptionTable
            prescriptionData={Medicines}
            showAvailability={showAvailability}
          />
        </div>

        <Divider />

        <div className="user-table">
          <Typography.Title level={4} strong>
            Custom Medicines
          </Typography.Title>
          <br />
          <ViewPrescriptionTable
            prescriptionData={ExtraMedicines}
            showAvailability={false}
          />
        </div>
      </Space>
    </Fragment>
  );
}

PrescriptionDisplay.propTypes = {
  patient: PropTypes.object,
  date: PropTypes.string,
  id: PropTypes.any,
  symptoms: PropTypes.string,
  Medicines: PropTypes.array,
  ExtraMedicines: PropTypes.array,
  showAvailability: PropTypes.bool,
};

export default PrescriptionDisplay;

const ViewPrescriptionTable = ({ prescriptionData, showAvailability }) => {
  const medicineTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 100,

      render: (text, record) => <span>{record?.Medicine?.name}</span>,
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      width: 100,
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 100,

      render: (text) => <span>{text} days</span>,
    },
    {
      title: "Requirement",
      dataIndex: "required",
      width: 100,
      key: "required",
      render: (text, record) => <span>{record.quantityRequired} Tablets</span>,
    },
    ...(showAvailability
      ? [
          {
            title: "Availability",
            dataIndex: "availability",
            width: 100,
            key: "availability",
            render: (text, record) => {
              const availability =
                record?.Medicine?.quantity >= record.quantityRequired;
              return (
                <Typography style={{ textAlign: "center" }}>
                  {availability ? (
                    <Tooltip title="Available" color="green" placement="right">
                      <CheckCircleOutlined style={{ color: "green" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title="Not Available"
                      color="orange"
                      placement="right"
                    >
                      <WarningOutlined style={{ color: "orange" }} />
                    </Tooltip>
                  )}
                </Typography>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <Fragment>
      {prescriptionData && (
        <Table
          rowKey={(record) => record.id}
          style={{ marginTop: -10 }}
          size="small"
          pagination={false}
          columns={medicineTableColumns}
          dataSource={prescriptionData}
        />
      )}
    </Fragment>
  );
};
