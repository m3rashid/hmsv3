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
  DevConfig,
} from "pages/admin";
import Patient from "pages/patient";
import ProfilePage from "pages/profile";
import Prescriptions from "pages/pharmacy/Prescriptions";
import DoctorAppointments from "pages/doctor/Appointments";
import CreateReceipts from "pages/pharmacy/CreateReceipts";
import PrescriptionForm from "pages/doctor/PrescribeMedicine";
import CreatePatientForm from "pages/reception/CreatePatient";
import CreateAppointmentForm from "pages/reception/CreateAppointment";

import {
  Medicines,
  NonMedicines,
  OtherAssets,
} from "components/Inventory/Display";
import { allPermissions } from "utils/constants";
import AddNewInventory from "components/Inventory/AddNew";
import {
  BookOutlined,
  BookTwoTone,
  DatabaseFilled,
  MedicineBoxOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WarningTwoTone,
} from "@ant-design/icons";

export const checkAccess = (Auth, route) => {
  if (!Auth.isLoggedIn) {
    return false;
  }

  const userType = Auth.user.permissions;
  if (route.role.includes("*")) return true;
  if (userType === "ADMIN") return true;
  const contains = route.role.some((role) => userType.includes(role));
  return contains;
};

const routes = [
  {
    path: "/me",
    component: ProfilePage,
    icon: <ProfileOutlined />,
    text: "home",
    role: ["*"],
  },
  {
    path: "/admin/home",
    component: AdminHome,
    icon: <SettingOutlined />,
    text: "Admin Home",
    showInNav: false,
    role: ["ADMIN"],
  },
  {
    path: "/admin/receptionists",
    component: Receptionists,
    icon: <UserOutlined />,
    text: "receptionists",
    role: ["ADMIN"],
  },
  {
    path: "/admin/doctors",
    component: Doctors,
    icon: <UserSwitchOutlined />,
    text: "doctors",
    role: ["ADMIN"],
  },
  {
    path: "/admin/pharmacists",
    component: Pharmacists,
    icon: <UserAddOutlined />,
    text: "pharmacists",
    role: ["ADMIN"],
  },
  {
    path: "/admin/inventory-managers",
    component: InventoryManagers,
    icon: <UserAddOutlined />,
    text: "inventory_managers",
    role: ["ADMIN"],
  },
  {
    path: "/admin/co-admins",
    component: CoAdmins,
    icon: <SettingOutlined />,
    text: "co_admins",
    role: ["ADMIN"],
  },
  {
    path: "/admin/others",
    component: Others,
    icon: <UserAddOutlined />,
    text: "others",
    role: ["ADMIN"],
  },
  {
    path: "/admin/patients",
    component: Patients,
    icon: <UserOutlined />,
    text: "patients",
    role: ["ADMIN"],
  },
  {
    path: "/admin/log-reports",
    component: LogReports,
    icon: <BookOutlined />,
    text: "log_reports",
    role: ["ADMIN"],
  },
  {
    path: "/admin/dev-config",
    component: DevConfig,
    icon: <SettingOutlined />,
    text: "dev_config",
    role: ["ADMIN"],
  },
  {
    path: "/reception/add-appointment",
    component: CreateAppointmentForm,
    icon: <BookOutlined />,
    text: "create_appointment",
    role: [allPermissions.RECEPTION_ADD_APPOINTMENT],
  },
  {
    path: "/doctor/appointments",
    component: DoctorAppointments,
    icon: <BookOutlined />,
    text: "doctor_appointments",
    role: [allPermissions.DOCTOR_APPOINTMENTS],
  },
  {
    path: "/doctor/prescribe-medicine",
    component: PrescriptionForm,
    icon: <BookOutlined />,
    text: "prescribe_medicines",
    role: [allPermissions.DOCTOR_PRESCRIBE_MEDICINE],
  },
  {
    path: "/patient",
    component: Patient,
    icon: <UserAddOutlined />,
    text: "patient",
    role: ["PATIENT"],
  },
  {
    path: "/pharmacy/prescriptions",
    component: Prescriptions,
    icon: <BookOutlined />,
    text: "pharmacy",
    role: [allPermissions.PHARMACY_PRESCRIPTIONS],
  },
  {
    path: "/pharmacy/receipt",
    component: CreateReceipts,
    icon: <BookOutlined />,
    text: "create_receipts",
    role: [allPermissions.PHARMACY_RECEIPT],
  },
  {
    path: "/appointment/create-patient",
    component: CreatePatientForm,
    icon: <BookTwoTone />,
    text: "create_patient",
    role: [allPermissions.RECEPTION_CREATE_PATIENT],
  },
  {
    path: "/inventory/new",
    component: AddNewInventory,
    icon: <WarningTwoTone />,
    text: "add_to_inventory",
    role: [allPermissions.INVENTORY_ADD_MEDICINE],
  },
  {
    path: "/inventory/medicines",
    component: Medicines,
    icon: <MedicineBoxOutlined />,
    text: "view_medicines",
    role: [allPermissions.INVENTORY_VIEW],
  },
  {
    path: "/inventory/non-medicines",
    component: NonMedicines,
    icon: <PlusCircleOutlined />,
    text: "view_non_medicines",
    role: [allPermissions.INVENTORY_VIEW],
  },
  {
    path: "/inventory/other-assets",
    component: OtherAssets,
    icon: <DatabaseFilled />,
    text: "view_other_assets",
    role: [allPermissions.INVENTORY_VIEW],
  },
  {
    path: "/patient/:id",
    component: Patient,
    icon: <UserAddOutlined />,
    text: "patient",
    role: [allPermissions.DOCTOR_APPOINTMENTS],
    showInNav: false,
  },
];

export default routes;
