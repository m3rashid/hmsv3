import {
  Form,
  Button,
  Select,
  Space,
  Typography,
  Row,
  Col,
  Modal,
  Divider,
  Drawer,
  Empty,
} from "antd";
import dayjs from "dayjs";
import {
  CheckCircleOutlined,
  PlusCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import { Fragment, useEffect } from "react";

import { socket } from "api/instance";
import PatientInfo from "pages/patient";
import quillDefaults from "components/common/quillDefaults";
import MedicineInput from "components/Medicine/MedicineInput";
import ReferPatientModal from "components/Prescription/ReferPatientModal";
import MedicineInputTable from "components/Medicine/MedicineInputTabular";
import PrescriptionDisplay from "components/Prescription/PrescriptionDisplay";
import usePrescribeMedicines from "components/Doctor/hooks/prescribeMeds.hook";
import styles from "pages/doctor/PrescribeMedicine.module.css";

const PrescriptionForm = () => {
  const {
    state: {
      loading,
      formData,
      medicines,
      doctorData,
      appointmentId,
      referToAnotherDoctor,
      form,
      CreatePrescriptionModalVisible,
      PatientData,
    },
    actions: {
      setFormData,
      setMedicines,
      setReferToAnotherDoctor,
      formSubmitHandler,
      addEmptyMedicine,
      deleteMedicine,
      handleReferPatientModalShow,
      handleAppointmentSelect,
      setCreatePrescriptionModalVisible,
      UpdateMedicine,
      setPatientData,
    },
  } = usePrescribeMedicines(socket);

  useEffect(() => {
    if (appointmentId !== null && doctorData.appointments.length > 0) {
      handleAppointmentSelect(appointmentId);
    }
  }, [appointmentId, doctorData.appointments.length, handleAppointmentSelect]);

  return (
    <Fragment>
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
          rules={[{ required: true, message: "Please Enter Appointment!" }]}
        >
          <Fragment>
            <Select
              allowClear
              onClear={(value) => handleAppointmentSelect(value)}
              placeholder="Select an appointment"
              style={{ maxWidth: 500, display: "block" }}
              onChange={(value) => handleAppointmentSelect(value)}
              getPopupContainer={(trigger) => trigger.parentNode}
              optionLabelProp="Appointment"
              options={doctorData.appointments?.reduce((acc, appointment) => {
                if (!appointment.pending) return acc;
                return [
                  ...acc,
                  {
                    value: appointment.id,
                    key: appointment.id,
                    label: (
                      <span key={appointment.id}>
                        {appointment.patient?.name} - &nbsp;
                        {dayjs(appointment.date).format("MMMM DD YYYY HH:mm A")}
                      </span>
                    ),
                  },
                ];
              }, [])}
            />
            <Button
              disabled={formData.appointment ? false : true}
              style={{ marginTop: 10 }}
              onClick={() => {
                setPatientData({
                  open: true,
                  data: formData.appointmentInfo,
                });
              }}
            >
              View Patient's History
            </Button>
          </Fragment>
        </Form.Item>
        <Form.Item
          label="Symptoms"
          name="symptoms"
          rules={[{ required: true, message: "Please Enter Symptoms!" }]}
          style={{ height: "100%" }}
        >
          <ReactQuill
            {...quillDefaults}
            style={{ ...quillDefaults.style, maxWidth: 500, borderRadius: 8 }}
            placeholder="Enter symptoms"
            value={formData.symptoms}
            onChange={(value) => setFormData({ ...formData, symptoms: value })}
          />
        </Form.Item>
        <Divider />
        <Space
          direction="vertical"
          style={{ width: "100%" }}
          className="user-table"
        >
          <Typography.Title level={4}>Medicines</Typography.Title>
          <MedicineInputTable
            tableClassName=""
            medicines={medicines.medicines}
            setMedicines={setMedicines}
          />
        </Space>
        <Divider />

        <Space
          direction="vertical"
          style={{ width: "100%" }}
          className="user-table"
        >
          <Typography.Title level={4}>Custom Medicines</Typography.Title>
          {medicines.extraMedicines.length > 0 ? (
            <Row className={styles.prescribeTableHeader}>
              <Col className={`${styles.prescribeColHeader}`} span={5}>
                Medicine
              </Col>
              <Col className={styles.prescribeColHeader} span={4}>
                Dosage
              </Col>
              <Col className={styles.prescribeColHeader} span={4}>
                Duration
              </Col>
              <Col className={styles.prescribeColHeader} span={9}>
                Description
              </Col>
              <Col className={styles.prescribeColHeader} span={2}>
                Action
              </Col>
            </Row>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <Typography.Text disabled>No Custom Medicines</Typography.Text>
              }
            />
          )}

          {medicines.extraMedicines?.map((medicine, index) => (
            <MedicineInput
              key={index}
              index={index}
              isExtra={true}
              type="extraMedicines"
              medicine={medicine}
              deleteMedicine={deleteMedicine}
              setMedicines={setMedicines}
              UpdateMedicine={UpdateMedicine}
            />
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="dashed"
              onClick={() => addEmptyMedicine("extraMedicines")}
              icon={<PlusCircleOutlined />}
              style={{ margin: "auto" }}
            >
              Add Custom Medicines
            </Button>
          </div>
        </Space>

        <Form.Item
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Space>
            {!!formData.appointmentInfo && (
              <Button
                htmlType="button"
                type="dashed"
                danger
                onClick={handleReferPatientModalShow}
                icon={<UserSwitchOutlined />}
              >
                Refer Patient
              </Button>
            )}
            <Button
              loading={loading.PrescribeMedicines}
              type="primary"
              htmlType="button"
              onClick={() => setCreatePrescriptionModalVisible(true)}
              icon={<CheckCircleOutlined />}
            >
              Confirm Prescription
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <PrescriptionDisplay
        id={formData?.appointmentInfo?.id}
        symptoms={formData?.symptoms}
        date={formData?.appointmentInfo?.date}
        patient={formData?.appointmentInfo?.patient}
        Medicines={medicines.medicines}
        ExtraMedicines={medicines.extraMedicines}
        showAvailability={true}
      />

      <ReferPatientModal
        modalState={referToAnotherDoctor}
        setModalState={setReferToAnotherDoctor}
        patientId={formData.appointmentInfo?.patientId}
        doctorId={formData.appointmentInfo?.doctorId}
      />

      <Drawer
        open={PatientData.open}
        width={"60%"}
        onClose={() => {
          setPatientData({ open: false, data: null });
        }}
      >
        {PatientData.data && (
          <PatientInfo id={PatientData?.data?.patient?.id} />
        )}
      </Drawer>

      <Modal
        open={CreatePrescriptionModalVisible}
        onOk={() => {
          setCreatePrescriptionModalVisible(false);
          form.submit();
        }}
        onCancel={() => setCreatePrescriptionModalVisible(false)}
        okText="Yes"
        cancelText="No"
        width={1000}
      >
        <PrescriptionDisplay
          id={formData?.appointmentInfo?.id}
          symptoms={formData?.symptoms}
          date={formData?.appointmentInfo?.date}
          patient={formData?.appointmentInfo?.patient}
          Medicines={medicines.medicines}
          ExtraMedicines={medicines.extraMedicines}
          showAvailability={true}
        />
      </Modal>
    </Fragment>
  );
};

export default PrescriptionForm;
