import React, { useState } from "react";
import PageHeader from "../../components/Header";
import { Checkbox, Menu, Typography, Divider, Layout } from "antd";
import CreatePatientForm from "../../components/Reception/CreatePatientForm/CreatePatientForm";
import CreateAppointmentForm from "../../components/Reception/CreateAppointmentForm/CreateAppointmentForm";
const Reception = () => {
  const [online, setOnline] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("createPatient");
  const user = {
    name: "Receptionist",
    email: "receptionist@gmail.com",
    online: !online,
  };

  const handleMenuChange = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <PageHeader title="Receptionist" subTitle="" user={user} />
      <Divider />
      <Typography.Title level={4}>Receptionist</Typography.Title>
      <Divider />
      <Menu
        onClick={handleMenuChange}
        selectedKeys={[selectedMenu]}
        mode="horizontal"
        style={{ backgroundColor: "transparent" }}
      >
        <Menu.Item key="createPatient">Create Patient</Menu.Item>
        <Menu.Item key="createAppointment">Create Appointment</Menu.Item>
      </Menu>
      <Divider />
      <Layout.Content>
        {selectedMenu === "createPatient" && <CreatePatientForm />}
        {selectedMenu === "createAppointment" && <CreateAppointmentForm />}
      </Layout.Content>
    </div>
  );
};

export default Reception;
