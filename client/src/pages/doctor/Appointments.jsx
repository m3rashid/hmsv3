import {
  Tabs,
  Modal,
  Space,
  Table,
  Drawer,
  Button,
  Divider,
  Tooltip,
  Typography,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Fragment, useCallback, useEffect, useState } from "react";

import { socket } from "api/instance";
import { authState } from "atoms/auth";
import { instance } from "api/instance";
import { doctorState } from "atoms/doctor";
import { LoadingAtom } from "atoms/loading";
import { toSentenceCase } from "utils/strings";
import { functionState } from "atoms/functions";
import { allPermissions } from "utils/constants";
import { receptionState } from "atoms/reception";
import ShowEntry from "components/common/showEntry";
import PrescriptionDisplay from "components/Prescription/PrescriptionDisplay";
import useTableStyles from "components/common/tableDefaults";

const DoctorAppointments = () => {
  const { tableStyles } = useTableStyles();
  const navigate = useNavigate();
  const { user } = useRecoilValue(authState);
  const doctorData = useRecoilValue(doctorState);
  const functionData = useRecoilValue(functionState);
  const receptionistState = useRecoilValue(receptionState);
  const isReception = user.permissions.includes(
    allPermissions.RECEPTION_ADD_APPOINTMENT.name
  );

  const [ModalVisible, setModalVisible] = useState({
    visible: false,
    id: null,
    data: {},
  });

  const [PrescriptionDrawer, setPrescriptionDrawer] = useState({
    visible: false,
    id: null,
    data: {},
    type: "",
  });

  const [loadingData, setLoadingData] = useRecoilState(LoadingAtom);

  const ToggleModal = () => {
    setModalVisible((prev) => ({
      ...prev,
      visible: !ModalVisible.visible,
    }));
  };

  const GetPrescriptionByAppointmentID = useCallback(async (record) => {
    const { data } = await instance.get(
      `/doctor/appointment-prescription/${record.id}`
    );

    setPrescriptionDrawer({
      visible: true,
      id: record.id,
      data: data,
    });
  }, []);

  useEffect(() => {
    socket.emit("get-doctor-appointments", { doctorId: user.id });
  }, [user.id]);

  const columnsPending = [
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      sorter: (a, b) => a?.patient?.name?.localeCompare(b.patientname),
      render: (item) => <Typography.Text>{item?.name}</Typography.Text>,
    },
    ...(isReception
      ? [
          {
            title: "Doctor Name",
            dataIndex: "doctor",
            key: "doctor",
            sorter: (a, b) =>
              a?.doctor?.Auth[0].name?.localeCompare(b?.doctor?.Auth[0].name),
            render: (item) => (
              <Typography.Text>{item?.Auth[0].name}</Typography.Text>
            ),
          },
          {
            title: "Doctor Email",
            dataIndex: "doctor",
            key: "doctor",
            sorter: (a, b) =>
              a?.doctor?.Auth[0].email?.localeCompare(b?.doctor?.Auth[0].email),
            render: (item) => (
              <Typography.Text>{item?.Auth[0].email}</Typography.Text>
            ),
          },
        ]
      : []),
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).isBefore(dayjs(b.date)),
      render: (item) => dayjs(item).format("MMMM DD YYYY, h:mm:ss a"),
      defaultSortOrder: "ascend",
      filters: [
        {
          text: "Today",
          value: 1,
        },
      ],
      onFilter: (value, record) => dayjs(record.date).isSame(dayjs(), "day"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        const disabled = !dayjs(record.date).isBefore(dayjs().add(6, "hours"));
        return (
          <Space>
            {!isReception && (
              <Popconfirm
                disabled={disabled}
                title="Create a prescription for this appointment?"
                onConfirm={() =>
                  navigate(
                    `/doctor/prescribe-medicine?appointmentId=${record.id}`
                  )
                }
                okText="Yes"
                cancelText="Cancel"
              >
                <Tooltip
                  placement="left"
                  title={
                    disabled
                      ? "Cant prescribe at current time"
                      : "Create a prescription"
                  }
                >
                  <Button disabled={disabled} type="primary">
                    Precribe
                  </Button>
                </Tooltip>
              </Popconfirm>
            )}
            <Button
              onClick={() =>
                setModalVisible({ visible: true, id: record.id, data: record })
              }
            >
              View
            </Button>
            <Button onClick={() => navigate(`/patient/${record.patient.id}`)}>
              Patient Details
            </Button>
          </Space>
        );
      },
    },
  ];

  const columnsPrevious = [
    {
      title: "PatientName",
      dataIndex: "patient",
      key: "patient",
      sorter: (a, b) => a?.patient?.name?.localeCompare(b?.patient?.name),
      render: (item) => <Typography.Text>{item?.name}</Typography.Text>,
    },
    {
      title: "Date/Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).isBefore(dayjs(b.date)),
      render: (item) => dayjs(item).format("DD MMM, h:mm:ss a"),
      defaultSortOrder: "ascend",
      filters: [{ text: "Today", value: 1 }],
      onFilter: (value, record) => dayjs(record.date).isSame(dayjs(), "day"),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      render: (item) => (
        <Typography.Text ellipsis={true}>{item}</Typography.Text>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() =>
              setModalVisible({ visible: true, id: record.id, data: record })
            }
          >
            View Form
          </Button>
          <Button onClick={() => GetPrescriptionByAppointmentID(record)}>
            View Prescription
          </Button>
          <Button onClick={() => navigate(`/patient/${record.patient.id}`)}>
            View Patient
          </Button>
        </Space>
      ),
    },
  ];

  const refreshAppointments = useCallback(async () => {
    setLoadingData({
      ...loadingData,
      refetchAppointments: true,
    });

    if (!isReception) {
      functionData.loadDoctorAppointment().then(() => {
        setLoadingData({
          ...loadingData,
          refetchAppointments: false,
        });
      });
    } else {
      functionData.receptionistGetAllAppointments().then(() => {
        setLoadingData({
          ...loadingData,
          refetchAppointments: false,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functionData]);

  return (
    <Fragment>
      <Typography.Title
        level={4}
        style={{ width: "100%", textAlign: "center" }}
      >
        Doctor Appointments
      </Typography.Title>
      <Button
        style={{ zIndex: 100, marginTop: 10 }}
        onClick={refreshAppointments}
        loading={loadingData.refetchAppointments}
      >
        <Typography.Text>
          {loadingData.refetchAppointments
            ? "Getting Latest Appointments"
            : "Refresh Appointments"}
        </Typography.Text>
      </Button>

      <Tabs
        defaultActiveKey="1"
        centered
        style={{ marginTop: -5 }}
        items={[
          {
            key: "1",
            label: "Active",
            children: (
              <Table
                rowKey={(record) => record.id}
                style={{ ...tableStyles }}
                size="small"
                loading={!isReception ? doctorData.loading : false}
                dataSource={
                  !isReception
                    ? (doctorData.appointments || []).filter(
                        (apt) => apt.pending
                      )
                    : receptionistState.activeAppointments
                }
                columns={columnsPending}
                pagination={
                  !isReception
                    ? {
                        total: (doctorData.appointments || []).reduce(
                          (acc, curr) => (!curr.pending ? acc : acc + 1),
                          0
                        ),
                        pageSize: 5,
                      }
                    : {
                        total: receptionistState.activeAppointments.length,
                        pageSize: 5,
                      }
                }
              />
            ),
          },
          {
            key: "2",
            label: "Completed",
            children: (
              <Table
                rowKey={(record) => record.id}
                style={{ ...tableStyles }}
                size="small"
                dataSource={
                  !isReception
                    ? (doctorData.appointments || []).filter(
                        (apt) => !apt.pending
                      )
                    : receptionistState.completedAppointments
                }
                columns={columnsPrevious}
                pagination={
                  !isReception
                    ? {
                        total: (doctorData.appointments || []).reduce(
                          (acc, curr) => (!curr.pending ? acc : acc - 1),
                          doctorData.appointments.length
                        ),
                        pageSize: 5,
                      }
                    : {
                        total: receptionistState.completedAppointments.length,
                        pageSize: 5,
                      }
                }
              />
            ),
          },
        ]}
      />

      <Drawer
        open={PrescriptionDrawer.visible}
        width={1000}
        onClose={() => setPrescriptionDrawer({ visible: false })}
      >
        <PrescriptionDisplay
          id={PrescriptionDrawer?.data?.appointmentId}
          ExtraMedicines={PrescriptionDrawer?.data?.CustomMedicines}
          Medicines={PrescriptionDrawer?.data?.medicines}
          date={PrescriptionDrawer?.data?.createdAt}
          patient={PrescriptionDrawer?.data?.appointment?.patient}
          symptoms={PrescriptionDrawer?.data?.symptoms}
        />
      </Drawer>

      <Modal
        open={ModalVisible.visible}
        onOk={ToggleModal}
        onCancel={ToggleModal}
        footer={[
          <Button key="back" onClick={ToggleModal}>
            Close
          </Button>,
        ]}
      >
        <ShowEntry
          label="Date and Time"
          value={dayjs(ModalVisible.data?.date).format(
            "MMMM DD YYYY, h:mm:ss a"
          )}
        />
        <Divider>
          <Typography.Title level={5}>Patient Info</Typography.Title>
        </Divider>
        <Space direction="vertical" size={3} style={{ padding: "10px" }}>
          {[
            "name",
            "department",
            "age",
            "email",
            "fathersName",
            "bloodGroup",
            "designation",
          ].map((item) => {
            const data = ModalVisible.data?.patient?.[item];
            if (!!data) {
              return (
                <ShowEntry
                  key={item}
                  label={toSentenceCase(item)}
                  value={data}
                />
              );
            }
            return null;
          })}
        </Space>
      </Modal>
    </Fragment>
  );
};

export default DoctorAppointments;
