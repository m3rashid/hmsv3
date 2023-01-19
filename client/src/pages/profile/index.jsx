import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";

import ProfileWrapper from "components/Profile/ProfileWrapper";
import { useRecoilState } from "recoil";
import { authState } from "atoms/auth";
import { instance, socket } from "api/instance";

const ProfilePage = () => {
  const { user } = useRecoilState(authState);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const formSubmitHandler = async (values) => {
    setLoading(true);
    //clear form
    form.resetFields();
    try {
      const { data } = await instance.post("/doctor/leave", values);
      message.success("Leave assigned successfully");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    socket.emit("doctor-left", user);
    console.log(socket);
    // TODO
    // inform admin that the doctor is leaving
  };

  useEffect(() => {
    return () => {
      socket.off("doctor-left");
    };
  }, []);

  return (
    <ProfileWrapper>
      <h3>Are you leaving ?</h3>
      <br />

      <Form
        form={form}
        onFinish={formSubmitHandler}
        labelAlign="left"
        style={{ width: "50%" }}
      >
        <Form.Item
          label="Reason"
          name="reason"
          style={{ display: "block" }}
          rules={[{ required: true, message: "Reason is required" }]}
        >
          <Input.TextArea placeholder="Enter your reason to leave" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ProfileWrapper>
  );
};

export default ProfilePage;
