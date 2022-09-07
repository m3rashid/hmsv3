import Patient from "./pages/Patient";

import {
  Home as AdminHome,
  Receptionists,
  Doctors,
  Patients,
  Pharmacists,
  InventoryManagers,
  CoAdmins,
  Others,
  LogReports,
} from "./pages/admin";

import {
  Medicines,
  NonMedicines,
  OtherAssets,
} from "./pages/inventory/Display";

import DoctorAppointments from "./pages/doctor/Appointments";
import PrescriptionForm from "./pages/doctor/prescribeMedicine";
import Prescriptions from "./pages/pharmacy/Prescriptions";
import CreateReceipts from "./pages/pharmacy/CreateReceipts";
import CreateAppointmentForm from "./pages/reception/CreateAppointmentForm";
import AddNewInventory from "./pages/inventory/New";
import CreatePatientForm from "./pages/reception/CreatePatientForm";
import { permissions } from "./utils/constants";

export const checkAccess = (Auth, route) => {
  if (!Auth.isLoggedIn) {
    return false;
  }

  const userType = Auth.user.permissions;
  if (userType === "ADMIN") return true;
  const contains = route.role.some((role) => userType.includes(role));
  return contains;
};

const routes = [
  // admin routes
  {
    path: "/admin/home",
    component: AdminHome,
    text: "Admin Home",
    role: ["ADMIN"],
  },
  {
    path: "/admin/receptionists",
    component: Receptionists,
    text: "Receptionists",
    role: ["ADMIN"],
  },
  {
    path: "/admin/doctors",
    component: Doctors,
    text: "Doctors",
    role: ["ADMIN"],
  },
  {
    path: "/admin/pharmacists",
    component: Pharmacists,
    text: "Pharmacists",
    role: ["ADMIN"],
  },
  {
    path: "/admin/inventory-managers",
    component: InventoryManagers,
    text: "Inventory-Managers",
    role: ["ADMIN"],
  },
  {
    path: "/admin/co-admins",
    component: CoAdmins,
    text: "Co-Admins",
    role: ["ADMIN"],
  },
  {
    path: "/admin/others",
    component: Others,
    text: "Others",
    role: ["ADMIN"],
  },
  {
    path: "/admin/patients",
    component: Patients,
    text: "Patients",
    role: ["ADMIN"],
  },
  {
    path: "/admin/log-reports",
    component: LogReports,
    text: "Log Reports",
    role: ["ADMIN"],
  },

  // doctor routes
  {
    path: "/doctor/appointments",
    component: DoctorAppointments,
    text: "Doctor Appointents",
    role: [permissions.DOCTOR_APPOINTMENTS],
  },
  {
    path: "/doctor/prescribe-medicine",
    component: PrescriptionForm,
    text: "Prescribe Medicine",
    role: [permissions.DOCTOR_PRESCRIBE_MEDICINE],
  },

  // patient routes
  {
    path: "/patient",
    component: Patient,
    text: "Patient",
    role: ["PATIENT"],
  },

  // pharmacy routes
  {
    path: "/pharmacy/prescriptions",
    component: Prescriptions,
    text: "Pharmacy",
    role: [permissions.PHARMACY_PRESCRIPTIONS],
  },
  {
    path: "/pharmacy/receipt",
    component: CreateReceipts,
    text: "Create receipts",
    role: [permissions.PHARMACY_RECEIPT],
  },

  // receptionist route
  {
    path: "/reception/add-appointment",
    component: CreateAppointmentForm,
    text: "Create Appointment",
    role: [permissions.RECEPTION_ADD_APPOINTMENT],
  },

  // appointment routes
  {
    path: "/appointment/create-patient",
    component: CreatePatientForm,
    text: "Create Patient",
    role: [permissions.RECEPTION_CREATE_PATIENT],
  },

  // inventory manager routes
  {
    path: "/inventory/new",
    component: AddNewInventory,
    text: "Add to Inventory",
    role: [permissions.INVENTORY_ADD_MEDICINE],
  },
  {
    path: "/inventory/medicines",
    component: Medicines,
    text: "View Medicines",
    role: [permissions.INVENTORY_VIEW],
  },
  {
    path: "/inventory/non-medicines",
    component: NonMedicines,
    text: "View Non Medicines",
    role: [permissions.INVENTORY_VIEW],
  },
  {
    path: "/inventory/other-assets",
    component: OtherAssets,
    text: "View Other Assets",
    role: [permissions.INVENTORY_VIEW],
  },

  //
  {
    path: "/patient/:id",
    component: Patient,
    text: "Patient",
    role: [permissions.DOCTOR_APPOINTMENTS],
    showInNav: false,
  },
];

export default routes;
