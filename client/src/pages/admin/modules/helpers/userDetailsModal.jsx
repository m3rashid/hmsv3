import React from "react";
import { Modal, Button, Space } from "antd";

import { toSentenceCase } from "../../../../components/utils/strings";

const UserDetailsModal = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <React.Fragment>
      <Space>
        <Button onClick={openModal}>Details</Button>
      </Space>
      <Modal
        title={data.name + ", " + data.origin}
        visible={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <div>Name: {data.name}</div>
        <div>Email: {data.email}</div>
        <div>
          Permissions:{" "}
          {data.permissions
            .map((p) => {
              return p
                .split("_")
                .map((s) => toSentenceCase(s))
                .join(" ");
            })
            .join(", ")}
        </div>
        {data.sex && <div>Gender: {data.sex}</div>}
        {data.designation && <div>Designation: {data.designation}</div>}
        {data.origin && <div>Origin: {data.origin}</div>}
        {data.bio && <div>Bio: {data.bio}</div>}
        <br />
        {data.address && <div>Address: {data.address}</div>}
        {data.authorityName && <div>Authority Name: {data.authorityName}</div>}
        {data.availability.length > 0 && (
          <div>Availability: {data.availability.join(" - ")}</div>
        )}
        {data.availableDays.length > 0 && (
          <div>Available Days: {data.availableDays.join(" - ")}</div>
        )}
        {data.category && <div>Category: {data.category}</div>}
        {data.contact && <div>Contact: {data.contact}</div>}
        {data.joined && <div>Joined: {data.joined}</div>}
        {data.role && <div>Role: {data.role}</div>}
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
            OK
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default UserDetailsModal;
