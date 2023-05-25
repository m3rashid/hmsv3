import { Fragment, useState } from "react";
import { Modal, Button, Space, Form, Select, message } from "antd";

import { instance } from "api/instance";
import { toSentenceCase } from "utils/strings";
import ShowEntry from "components/common/showEntry";
import { allPermissions, backToRealDays } from "utils/constants";

const UserDetailsModal = ({ data }) => {
  const [editPermissions, setEditPermissions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const onFinish = async (values) => {
    try {
      message.loading({ content: "Loading...", key: "edit-permissions" });
      await instance.post("/admin/edit-permissions", {
        permissions: values.permissions,
        userId: data.id,
      });

      message.success({
        content: "Permissions edited Successfully",
        key: "edit-permissions",
      });
      closeModal();
    } catch (err) {
      closeModal();
      message.error({
        content: "Permissions editing Failed",
        key: "edit-permissions",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: "Permissions editing Failed",
      key: "edit-permissions",
    });
  };

  return (
    <Fragment>
      <Space>
        <Button onClick={openModal}>Details</Button>
      </Space>
      <Modal
        title={data.name + ", " + data.origin}
        open={isModalVisible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <ShowEntry label="Name" value={data.name} />
        <ShowEntry label="Email" value={data.email} />
        <ShowEntry
          label="Permissions"
          value={data.permissions
            .map((p) => {
              return p
                .split("_")
                .map((s) => toSentenceCase(s))
                .join(" ");
            })
            .join(", ")}
        />

        {data.sex && <ShowEntry label="Gender" value={data.sex} />}
        {data.designation && (
          <ShowEntry label="Designation" value={data.designation} />
        )}
        {data.origin && <ShowEntry label="Origin" value={data.origin} />}
        {data.bio && <ShowEntry label="Bio" value={data.bio} />}
        <br />
        {data.address && <ShowEntry label="Address" value={data.address} />}
        {data.authorityName && (
          <ShowEntry label="Authority Name" value={data.authorityName} />
        )}
        {data.availability?.length > 0 &&
          data.availability.map((av) => (
            <div key={av.id} style={{ marginBottom: "10px" }}>
              <strong style={{ marginBottom: 0 }}>
                {backToRealDays[av.day]}
              </strong>
              {av.range &&
                av.range.map((r) => {
                  if (!r.from || !r.to) return null;
                  return (
                    <p key={r.id} style={{ marginBottom: 0 }}>
                      {`${r.from?.hour}:${r.from?.minute}`} to &nbsp;
                      {`${r.to?.hour}:${r.to?.minute}`}
                    </p>
                  );
                })}
            </div>
          ))}

        {data.category && <ShowEntry label="Category" value={data.category} />}
        {data.contact && <ShowEntry label="Contact" value={data.contact} />}
        {data.joined && <ShowEntry label="Joined" value={data.joined} />}
        {data.role && <ShowEntry label="Role" value={data.role} />}

        <div style={{ marginTop: 10 }}>
          {editPermissions ? (
            <Form
              style={{ marginTop: 20 }}
              name={`Edit User Permissions: ${data.name}`}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                key="permissions"
                name="permissions"
                label="Permissions"
              >
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select permissions"
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  defaultValue={data.permissions}
                >
                  {Object.entries(allPermissions).map(([key, value], i) => (
                    <Select.Option key={`${key}-${i}`} value={value.name}>
                      {value.name
                        .split("_")
                        .map((s) => toSentenceCase(s))
                        .join(" ")}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "0px -24px -10px -24px",
                  padding: "0px 24px 0 24px",
                }}
              >
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => setEditPermissions(false)}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Set new Permissions
                </Button>
              </div>
            </Form>
          ) : (
            <Button
              style={{ width: "100%" }}
              onClick={() => setEditPermissions(true)}
            >
              Edit User Permissions
            </Button>
          )}
        </div>
      </Modal>
    </Fragment>
  );
};

export default UserDetailsModal;
