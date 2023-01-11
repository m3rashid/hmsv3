import { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table } from "antd";

import AdminWrapper from "components/Admin/adminWrapper";
import useGetUserDetail from "components/Admin/modules/helpers/getUserDetail";
import ShowEntry from "components/common/showEntry";
import { LoadingOutlined } from "@ant-design/icons";

const Patients = () => {
  const [modal, setModal] = useState({
    data: null,
    open: false,
    loading: false,
  });
  const { getAllUsers, users, RefreshUserButton, getSinglePatientDetail } =
    useGetUserDetail({
      userType: "patients",
      userRole: "PATIENT",
    });

  const handleGetDetails = async (id) => {
    setModal({ data: null, open: true, loading: true });
    const data = await getSinglePatientDetail(id);
    setModal({ data, open: true, loading: false });
  };

  const closeModal = () => {
    setModal({ data: null, open: false, loading: false });
  };

  useEffect(() => {
    getAllUsers().then().catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Mobile No.",
      dataIndex: "contact",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Visit",
      dataIndex: "lastVisit",
      key: "lastVisit",
      render: (text) => <span>{text ?? "No Visit"}</span>,
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <Space>
            <Button onClick={() => handleGetDetails(record.id)}>Details</Button>
          </Space>
        );
      },
    },
  ];

  return (
    <AdminWrapper aside={<RefreshUserButton />}>
      <Modal
        title="Patient Details"
        open={modal.open}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Spin indicator={<LoadingOutlined />} spinning={modal.loading} />
        {modal.data && (
          <div>
            {Object.entries(modal.data).map(([key, value]) => (
              <ShowEntry
                key={key}
                label={key.toUpperCase()}
                value={value.toUpperCase()}
              />
            ))}
          </div>
        )}
      </Modal>
      <Table
        size="small"
        dataSource={users}
        columns={columns}
        pagination={{
          total: users.length,
          defaultPageSize: 10,
        }}
      />
    </AdminWrapper>
  );
};

export default Patients;
