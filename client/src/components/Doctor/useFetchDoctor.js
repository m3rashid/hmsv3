import { message } from "antd";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { socket } from "../../api/socket";
import { permissions } from "../../routes";
import { authState } from "../../atoms/auth";
import { instance } from "../../api/instance";
import { doctorState } from "../../atoms/doctor";
import useNotifications from "../../Hooks/useNotifications";

export default function useFetchDoctor() {
  const auth = useRecoilValue(authState);
  const [DoctorData, setDoctorData] = useRecoilState(doctorState);
  const { addNotification } = useNotifications();

  const loadDoctorAppointment = useCallback(async () => {
    if (!auth.token) {
      return;
    }

    const res = await instance.get(`/doctor/get-appointments`, {
      headers: {
        authorization: auth.token,
      },
    });
    setDoctorData({
      ...DoctorData,
      appointments: res.data.appointments,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DoctorData, setDoctorData]);

  useEffect(() => {
    if (
      auth.isLoggedIn &&
      auth.user.permissions.includes(permissions.DOCTOR_APPOINTMENTS)
    ) {
      loadDoctorAppointment();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // const loadMedicine = useCallback(async () => {}, []);

  const addAppointment = useCallback(
    async (data) => {
      setDoctorData((prev) => {
        return {
          ...prev,
          appointments: [...prev.appointments, data],
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DoctorData, setDoctorData]
  );

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(permissions.DOCTOR_PRESCRIBE_MEDICINE)
    ) {
      return;
    }

    socket.on("new-prescription-by-doctor-created", ({ data }) => {
      message.success(
        `New Prescription for ${data.prescription.id} created successfully!`
      );
    });

    return () => {
      socket.off("new-prescription-by-doctor-created");
    };
  }, [auth]);

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(permissions.DOCTOR_APPOINTMENTS)
    ) {
      return;
    }

    socket.on("new-appointment-created", (data) => {
      message.info(`New appointment created`);
      addNotification({
        type: "success",
        title: "New Appointment",
        message: `${data.patient.name} has a new appointment`,
        action: {
          label: "View",
          callback: () => {},
        },
      });
      addAppointment(data);
    });
    return () => {
      socket.off("new-appointment-created");
    };
  }, [addAppointment, addNotification, auth]);
}
