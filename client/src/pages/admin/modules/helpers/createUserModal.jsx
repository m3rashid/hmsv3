import React from "react";
import { Modal, Button, Input, Form, message, Select } from "antd";

import {
  showGender,
  toSentenceCase,
} from "../../../../components/utils/strings";
import { instance } from "../../../../api/instance";

export const supportedUserRoles = [
  "DOCTOR",
  "ADMIN",
  "RECEPTIONIST",
  "PHARMACIST",
  "INVENTORY_MANAGER",
  "CO_ADMIN",
  "OTHER",
];

function CreateUserModal(props) {
  const onFinish = async (values) => {
    try {
      message.loading({
        content: "Loading...",
        key: "auth/createUser",
      });

      const createdUser = { ...values };

      console.log(createdUser);

      const { data } = await instance.post("/auth/signup", createdUser);

      console.log(data);

      message.success({
        content: "User created Successfully",
        key: "auth/createUser",
      });
      props.handleCancel();
    } catch (error) {
      message.error({
        content: "User creation Failed",
        key: "auth/createUser",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error({
      content: "User creation Failed",
      key: "auth/createUser",
    });
  };

  return (
    <React.Fragment>
      <Modal
        title="Create"
        visible={props.isModalVisible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
      >
        <Form
          name="Create User"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            rules={[{ required: true, message: "Please enter a username!" }]}
            name="name"
            label="Name"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please enter an email!" }]}
            name="email"
            label="Email"
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              { required: true, message: "Please select a role!" },
              {
                validator: (_, value) => {
                  if (!supportedUserRoles.includes(value)) {
                    return Promise.reject(new Error("Role not supported!"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select placeholder="Select Role">
              {supportedUserRoles.map((role) => (
                <Select.Option value={role}>
                  {role
                    .split("_")
                    .map((r) => toSentenceCase(r))
                    .join(" ")}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sex"
            label="Gender"
            rules={[{ required: true, message: "Please select a gender!" }]}
          >
            <Select placeholder="Select Gender">
              {["m", "f", "o"].map((gender) => (
                <Select.Option value={gender}>
                  {showGender(gender)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              borderTop: "1px solid #f0f0f0",
              margin: "24px -24px -10px -24px",
              padding: "10px 24px 0 24px",
            }}
          >
            <Button
              style={{ marginRight: "10px" }}
              onClick={props.handleCancel}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default CreateUserModal;
