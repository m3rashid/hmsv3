import React from "react";
import { Form, Button, Input, AutoComplete, DatePicker } from "antd";

const CreateAppointmentForm = () => {
  const doctors = [
    {
      label: "Dr. Sarfraz Alam",
      value: "Dr. Sarfraz Alam",
    },
    {
      label: "Dr. Husain Shahid",
      value: "Dr. Husain Shahid",
    },
    {
      label: "Dr. Zafar Ali",
      value: "Dr. Zafar Ali",
    },
  ];

  return (
    <Form labelAlign="left" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
      <Form.Item
        label="Patient (ID or email)"
        name="patient"
        rules={[{ required: true, message: "Please select a patient!" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        label="Doctor Name"
        name="doctor"
        rules={[{ required: true, message: "Please select a doctor!" }]}
      >
        <AutoComplete
          style={{ width: 200 }}
          options={doctors}
          placeholder="Name"
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Form.Item>
      <Form.Item
        label="Date"
        name="datetime"
        rules={[{ required: true, message: "Please enter date and time !" }]}
      >
        <DatePicker showTime />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateAppointmentForm;
