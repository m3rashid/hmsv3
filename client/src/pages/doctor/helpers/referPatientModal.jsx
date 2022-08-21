import { Form, message } from "antd";
import React from "react";

const ReferPatientModal = ({}) => {
  const onFinish = async (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error({
      content: "Permissions editing Failed",
      key: "edit-permissions",
    });
  };

  return (
    <React.Fragment>
      <Form
        style={{ marginTop: 20 }}
        name={"Refer to another Doctor"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      ></Form>
    </React.Fragment>
  );
};

export default ReferPatientModal;
