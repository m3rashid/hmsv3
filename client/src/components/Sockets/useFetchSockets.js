import { message } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { socket } from "api/instance";
import { authState } from "atoms/auth";
import { instance } from "api/instance";
import { doctorState } from "atoms/doctor";
import { LoadingAtom } from "atoms/loading";
import { pharmacyState } from "atoms/pharmacy";
import { functionState } from "atoms/functions";
import { inventoryState } from "atoms/inventory";
import useNotifications from "Hooks/useNotifications";
import { InventoryTypes, allPermissions } from "utils/constants";
import { receptionState } from "atoms/reception";

export default function useFetchSockets() {
  const auth = useRecoilValue(authState);
  const [DoctorData, setDoctorData] = useRecoilState(doctorState);
  const setInventoryData = useSetRecoilState(inventoryState);
  const setPharmacyData = useSetRecoilState(pharmacyState);
  const setLoadingData = useSetRecoilState(LoadingAtom);
  const setFunctionData = useSetRecoilState(functionState);
  const setReceptionData = useSetRecoilState(receptionState);
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("error", (data) => {
      message.error(data.message);
      setLoadingData({});
    });

    return () => {
      socket.off("error");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadInventoryItems = useCallback(async () => {
    try {
      const MedicineInventory = await instance.get("/inventory/search", {
        params: {
          type: InventoryTypes.Medicine,
          name: "",
        },
      });
      const NonMedicineInventory = await instance.get("/inventory/search", {
        params: {
          type: InventoryTypes.NonMedicine,
          name: "",
        },
      });

      const otherAssetsInventory = await instance.get("/inventory/search", {
        params: {
          type: InventoryTypes.OtherAssets,
          name: "",
        },
      });

      setInventoryData({
        [InventoryTypes.Medicine]: MedicineInventory.data,
        [InventoryTypes.NonMedicine]: NonMedicineInventory.data,
        [InventoryTypes.OtherAssets]: otherAssetsInventory.data,
      });
    } catch (err) {}
  }, [setInventoryData]);

  useEffect(() => {
    if (
      auth.isLoggedIn &&
      (auth.user.permissions.includes(allPermissions.INVENTORY_VIEW.name) ||
        auth.user.permissions.includes(
          allPermissions.DOCTOR_PRESCRIBE_MEDICINE.name
        ) ||
        auth.user.permissions.includes(
          allPermissions.INVENTORY_ADD_MEDICINE.name
        ))
    ) {
      loadInventoryItems();
    }
  }, [auth, loadInventoryItems]);

  const loadPharmacyPrescriptions = useCallback(async () => {
    const { data } = await instance.get(`/pharmacy/prescriptions`);

    setPharmacyData((prev) => ({
      ...prev,
      prescriptions: data.prescriptions,
    }));
  }, [setPharmacyData]);

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(
        allPermissions.PHARMACY_PRESCRIPTIONS.name
      )
    ) {
      return;
    }
    loadPharmacyPrescriptions();
    socket.on("new-prescription-by-doctor-created", ({ data }) => {
      setPharmacyData((prevData) => ({
        ...prevData,
        prescriptions: [...prevData.prescriptions, data.prescription],
      }));
      message.info(`New Prescription for ${data.prescription.id}!`);
    });
    socket.on("prescription-dispensed", ({ data }) => {
      loadPharmacyPrescriptions();
      message.success(
        `Prescription ${data.prescription.id} has been dispensed!`
      );
    });

    return () => {
      socket.off("new-prescription-by-doctor-created");
      socket.off("prescription-dispensed");
    };
  }, [
    auth,
    loadPharmacyPrescriptions,
    navigate,
    setLoadingData,
    setPharmacyData,
  ]);

  const getAllAppointmentsReceptionist = useCallback(async () => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(
        allPermissions.RECEPTION_ADD_APPOINTMENT.name
      )
    ) {
      return;
    }

    const { data } = await instance.get("/reception/appointment/all");
    const pending = [];
    const completed = [];
    data.appointments.forEach((appoint) => {
      if (appoint.pending) pending.push(appoint);
      else completed.push(appoint);
    });
    setReceptionData({
      activeAppointments: pending,
      completedAppointments: completed,
    });
  }, [setReceptionData, auth]);

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(
        allPermissions.RECEPTION_ADD_APPOINTMENT.name
      )
    ) {
      return;
    }

    getAllAppointmentsReceptionist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const loadDoctorAppointment = useCallback(async () => {
    setDoctorData((prev) => ({ ...prev, loading: true }));
    const res = await instance.get("/doctor/get-appointments");
    setDoctorData({
      ...DoctorData,
      appointments: res.data.appointments,
      loading: false,
    });
  }, [DoctorData, setDoctorData]);

  useEffect(() => {
    if (
      auth.isLoggedIn &&
      auth.user.permissions.includes(allPermissions.DOCTOR_APPOINTMENTS.name)
    ) {
      loadDoctorAppointment();
      loadMedicine();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const loadMedicine = useCallback(async () => {}, []);

  const addAppointment = useCallback(
    async (data) => {
      setDoctorData((prev) => {
        return {
          ...prev,
          appointments: [...prev.appointments, data],
        };
      });
    },
    [setDoctorData]
  );

  const setAppointmentPendingStatus = useCallback(
    async (id, pending) => {
      setDoctorData((prev) => ({
        ...prev,
        appointments: prev.appointments.map((apt) =>
          apt.id === id ? { ...apt, pending } : apt
        ),
      }));
    },
    [setDoctorData]
  );

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(
        allPermissions.DOCTOR_PRESCRIBE_MEDICINE.name
      )
    ) {
      return;
    }

    socket.on("new-prescription-by-doctor-created", ({ data }) => {
      loadDoctorAppointment();
      setLoadingData({});
      navigate("/doctor/appointments");

      message.success(
        `New Prescription for ${data.prescription.appointment.patient.name} created successfully!`
      );
    });

    return () => {
      socket.off("new-prescription-by-doctor-created");
    };
  }, [
    auth,
    loadDoctorAppointment,
    navigate,
    setAppointmentPendingStatus,
    setLoadingData,
  ]);

  useEffect(() => {
    if (
      !auth.isLoggedIn ||
      !auth.user.permissions.includes(allPermissions.DOCTOR_APPOINTMENTS.name)
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

  useEffect(() => {
    setFunctionData({
      addAppointment,
      addNotification,
      loadDoctorAppointment,
      setAppointmentPendingStatus,
      loadPharmacyPrescriptions,
      loadInventoryItems,
      receptionistGetAllAppointments: getAllAppointmentsReceptionist,
    });
  }, [
    addAppointment,
    addNotification,
    loadDoctorAppointment,
    loadInventoryItems,
    loadPharmacyPrescriptions,
    setAppointmentPendingStatus,
    setFunctionData,
    getAllAppointmentsReceptionist,
  ]);
}
