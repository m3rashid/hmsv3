import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Button, Space, Table, Tabs, Drawer } from 'antd';

import { instance } from 'api/instance';
import { pharmacyState } from 'atoms/pharmacy';
import ShowReceipt from 'pages/pharmacy/ShowReciept';
import PrescriptionDisplay from 'components/Prescription/PrescriptionDisplay';
import { authState } from 'atoms/auth';
import { allPermissions } from 'utils/constants';
import useTableStyles from 'components/common/tableDefaults';

const Prescriptions = () => {
  const { tableStyles } = useTableStyles();
  const pharmacyData = useRecoilValue(pharmacyState);
  const { user } = useRecoilValue(authState);
  const navigate = useNavigate();
  const [ModalVisible, setModalVisible] = useState({
    visible: false,
    id: null,
    type: null,
    data: {},
  });

  const ToggleModal = () => {
    setModalVisible({
      ...ModalVisible,
      visible: !ModalVisible.visible,
    });
  };

  const ShowPrescriptionHandler = useCallback(async (record, type) => {
    try {
      const { data } = await instance.get(`/pharmacy/prescriptions/${record.id}`);

      setModalVisible({
        visible: true,
        id: record.id,
        type: type,
        data: data.prescription,
      });
    } catch (err) {
      message.error('Error Occurred While Fetching');
    }
  }, []);

  const pendingColumns = [
    {
      title: 'PatientName',
      dataIndex: 'appointment.patient.name',
      key: 'appointment.patient.name',
      render: (text, record) => {
        return <span>{record.appointment.patient.name}</span>;
      },
    },
    {
      title: 'DoctorName',
      dataIndex: 'appointment.doctor.name',
      key: 'appointment.doctor.name',
      render: (text, record) => {
        return <span>{record.appointment.doctor?.Auth[0].name}</span>;
      },
    },
    {
      title: 'Date/Time',
      dataIndex: 'datePrescribed',
      key: 'datePrescribed',
      render: (text, record) => {
        return <span>{dayjs(record.datePrescribed).format('DD/MM/YYYY hh:mm a')}</span>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              ShowPrescriptionHandler(record, 'prescription');
            }}
          >
            View Prescriptions
          </Button>
          {user.permissions.includes(allPermissions.PHARMACY_RECEIPT.name) && (
            <Button
              onClick={() => {
                navigate(`/pharmacy/receipt?prescriptionId=${record.id}`);
              }}
            >
              Dispense
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const processedColumns = [
    {
      title: 'PatientName',
      dataIndex: 'appointment.patient.name',
      key: 'appointment.patient.name',
      render: (text, record) => {
        return <span>{record.appointment.patient.name}</span>;
      },
    },
    {
      title: 'DoctorName',
      dataIndex: 'appointment.doctor.name',
      key: 'appointment.doctor.name',
      render: (text, record) => {
        return <span>{record.appointment.doctor?.Auth[0].name}</span>;
      },
    },
    {
      title: 'Date/Time',
      dataIndex: 'datePrescribed',
      key: 'datePrescribed',
      render: (text, record) => {
        return <span>{dayjs(record.datePrescribed).format('DD/MM/YYYY hh:mm a')}</span>;
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              ShowPrescriptionHandler(record, 'prescription');
            }}
          >
            View Prescription
          </Button>
          <Button
            onClick={() => {
              ShowPrescriptionHandler(record, 'receipt');
            }}
          >
            Show Receipt
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: '1',
            label: 'Active',
            children: (
              <Table
                rowKey={(record) => record.id}
                style={{ ...tableStyles }}
                size="small"
                dataSource={pharmacyData.prescriptions.filter((prsp) => prsp.pending)}
                columns={pendingColumns}
              />
            ),
          },
          {
            key: '2',
            label: 'Completed',
            children: (
              <Table
                rowKey={(record) => record.id}
                style={{ ...tableStyles }}
                size="small"
                dataSource={pharmacyData.prescriptions.filter((prsp) => !prsp.pending)}
                columns={processedColumns}
              />
            ),
          },
        ]}
      />
      <Drawer
        open={ModalVisible?.visible}
        onOk={ToggleModal}
        onClose={ToggleModal}
        footer={[
          <Button key="back" onClick={ToggleModal}>
            Close
          </Button>,
        ]}
        width={1000}
      >
        {ModalVisible?.type === 'prescription' ? (
          <PrescriptionDisplay
            id={ModalVisible?.data?.appointmentId}
            ExtraMedicines={ModalVisible?.data?.CustomMedicines}
            Medicines={ModalVisible?.data?.medicines}
            date={ModalVisible?.data?.createdAt}
            patient={ModalVisible?.data?.appointment?.patient}
            symptoms={ModalVisible?.data?.symptoms}
          />
        ) : (
          <ShowReceipt
            data={[
              {
                ...ModalVisible?.data,
                date: dayjs(ModalVisible?.data?.datePrescribed).format('MMMM DD YYYY HH:mm A'),
              },
            ]}
          />
        )}
      </Drawer>
    </Fragment>
  );
};

export default Prescriptions;
