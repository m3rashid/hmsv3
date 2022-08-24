import { Button, Form, message, Modal, Select } from "antd";
import React from "react";
import { instance } from "../../../api/instance";

const ReferPatientModal = ({
  patientId,
  doctorId,
  modalState,
  setModalState,
}) => {
  const closeModal = () => setModalState(false);

  // TODO: use this with sockets
  const onFinish = async (values) => {
    try {
      message.loading({ content: "Loading...", key: "refer-patient" });

      const res = await instance.post("/doctor/refer", {
        ...values,
        patientId,
        prevDoctorId: doctorId,
      });
      console.log({ userCreated: res.data });
      message.success({
        content: "Refer Patient Success",
        key: "refer-patient",
      });
      closeModal();
    } catch (error) {
      message.error({
        content: "Refer Patient Failed",
        key: "auth/createUser",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error({
      content: "Refer Patient Failed",
      key: "refer-patient",
    });
  };

  return (
    <React.Fragment>
      <Modal
        title="Refer Patient"
        visible={modalState}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          style={{ marginTop: 20 }}
          name={"Refer to another Doctor"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
        >
          <Select
            placeholder="Select Doctor"
            name="nextDoctorId"
            allowClear
            style={{ width: "100%" }}
          >
            {/* TODO */}
          </Select>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid #f0f0f0",
              margin: "24px -24px -10px -24px",
              padding: "10px 24px 0 24px",
            }}
          >
            <Button style={{ marginRight: "10px" }} onClick={closeModal}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Refer patient to this doctor
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default ReferPatientModal;
