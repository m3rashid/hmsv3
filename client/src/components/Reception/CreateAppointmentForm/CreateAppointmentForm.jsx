import React, { useEffect, useState } from "react";
import { Form, Button, Input, AutoComplete, DatePicker, message } from "antd";
import { socket } from "../../../api/socket";
import { instance } from "../../../api/instance";
const CreateAppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const formSubmitHandler = (values) => {
    console.log(values);
    socket.emit("create-appointment", {
      patientId: values.patient,
      doctorId: values.doctor,
      date: values.datetime,
    });
  };
  useEffect(() => {
    instance.get("/reception/doctors").then((res) => {
      console.log(res.data);
      setDoctors(
        res.data?.map((doctor) => ({
          value: doctor.email,
          label: `${doctor.name}`,
        }))
      );
    });
    socket.on("created-appointment", (data) => {
      console.log(data);
      message.success(`Appointment ${data.title} created successfully!`);
    });

    return () => {
      socket.off("created-appointment");
    };
  }, []);

  return (
    <Form
      onFinish={formSubmitHandler}
      labelAlign="left"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 8 }}
    >
      <Form.Item
        label="Patient (email or id)"
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
