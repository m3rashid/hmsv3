import {
  Form,
  Button,
  Input,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Card,
  Collapse,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

import { socket } from "../../api/socket";
import Header from "../../components/Header";
import GeneratePdf from "../../components/generatePdf.jsx";
import MedicineInput from "../../components/Doctor/MedicineInput";

import usePrescribeMedicines from "./helpers/prescribeMeds.hook";
import SingleMedicine from "./helpers/singleMedicine";

const PrescriptionForm = () => {
  const {
    state: {
      loading,
      print,
      formData,
      medicines,
      doctorData,
      appointmentId,
      // referToAnotherDoctor,
      navigate,
      form,
    },
    actions: {
      setPrint,
      setLoading,
      setFormData,
      setMedicines,
      // setReferToAnotherDoctor,
      formSubmitHandler,
      addEmptyMedicine,
      deleteMedicine,
      handleReferPatientModalShow,
      handleAppointmentSelect,
    },
  } = usePrescribeMedicines(socket);

  useEffect(() => {
    socket.on("new-prescription-by-doctor-created", (data) => {
      setLoading(false);
      navigate("/doctor/appointments");
    });
    return () => {
      socket.off("new-prescription-by-doctor-created");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    if (appointmentId !== null && doctorData.appointments.length > 0) {
      handleAppointmentSelect(appointmentId);
    }
  }, [appointmentId, doctorData.appointments.length, handleAppointmentSelect]);

  console.log(form.getFieldsValue(true));

  return (
    <React.Fragment>
      <div>
        <Header />
      </div>
      <div style={{ padding: 10 }}>
        <Row>
          <Col span={12}>
            <Typography.Title level={4}>Create Prescription</Typography.Title>
            <Form
              form={form}
              onFinish={formSubmitHandler}
              labelAlign="left"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Choose Appointment"
                name="appointment"
                rules={[
                  { required: true, message: "Please Enter patient name!" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select an appointment"
                  allowClear
                  onChange={(value) => {
                    console.log("changed", value);
                    handleAppointmentSelect(value);
                  }}
                  optionLabelProp="Appointment"
                >
                  {doctorData.appointments.map((appointment) => (
                    <Select.Option key={appointment.id} value={appointment.id}>
                      <span>
                        {appointment.patient?.name} -{" "}
                        {dayjs(appointment.date).format("MMMM DD YYYY HH:mm A")}
                      </span>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Symptoms" name="symptoms">
                <Input.TextArea
                  type="text"
                  placeholder="Enter symptoms"
                  allowClear
                  onChange={(e) => {
                    setFormData({ ...formData, symptoms: e.target.value });
                  }}
                />
              </Form.Item>

              <Space direction="vertical" style={{ width: "100%" }}>
                {medicines.map((medicine, index) => (
                  <MedicineInput
                    key={index}
                    index={index}
                    medicine={medicine}
                    deleteMedicine={deleteMedicine}
                    setMedicines={setMedicines}
                  />
                ))}

                <Button
                  type="primary"
                  htmlType="button"
                  onClick={addEmptyMedicine}
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  + Add New Medicines
                </Button>
              </Space>

              <Form.Item label="Custom Medicines" name="CustomMedicines">
                <Input.TextArea
                  type="text"
                  placeholder="Enter custom medicines"
                  allowClear
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      CustomMedicines: e.target.value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button loading={loading} type="primary" htmlType="submit">
                  Confirm Create Prescription
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} style={{ padding: "10px" }}>
            <Typography.Title level={4}>Prescription Preview</Typography.Title>
            <Card
              title="Appointment Details"
              style={{ background: "transparent" }}
            >
              <Space direction="vertical">
                <Typography.Text>
                  Appointment ID: {formData?.appointmentInfo?.id}
                </Typography.Text>
                <Typography.Text>
                  Patient Name: {formData?.appointmentInfo?.patient.name}
                </Typography.Text>
                <Typography.Text>
                  Date:{" "}
                  {dayjs(formData?.appointmentInfo?.date).format(
                    "MMMM DD YYYY HH:mm A"
                  )}
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
              <Typography.Text>{formData?.symptoms}</Typography.Text>
            </Space>

            <Card title="Medicines" style={{ background: "transparent" }}>
              <Space direction="vertical" size={"large"}>
                {medicines.map((medicine, index) => (
                  <SingleMedicine
                    key={index}
                    index={index}
                    medicine={medicine}
                  />
                ))}
              </Space>
            </Card>
            <Card
              title="Custom Medicines"
              style={{ background: "transparent" }}
            >
              {formData?.CustomMedicines}
            </Card>
          </Col>
        </Row>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: "30px",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <Button
            type="primary"
            onClick={() => setPrint(true)}
            className="print__button"
          >
            Print Prescription
          </Button>

          <Button
            type="primary"
            style={{ background: "#ff0000", border: "none" }}
            onClick={handleReferPatientModalShow}
          >
            Refer Patient to another doctor
          </Button>
        </div>

        <Collapse bordered={false} style={{ padding: 0, margin: 0 }}>
          <Collapse.Panel header="Show print preview" key="1">
            <GeneratePdf
              print={print}
              data={[
                {
                  ...formData,
                  medicines: medicines,
                  date: dayjs().format("MMMM DD YYYY HH:mm A"),
                },
              ]}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default PrescriptionForm;
