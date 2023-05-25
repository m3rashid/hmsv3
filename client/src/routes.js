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
} from '@ant-design/icons';

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
} from 'pages/admin';
import Patient from 'pages/patient';
import ProfilePage from 'pages/profile';
import Prescriptions from 'pages/pharmacy/Prescriptions';
import DoctorAppointments from 'pages/doctor/Appointments';
import CreateReceipts from 'pages/pharmacy/CreateReceipts';
import PrescriptionForm from 'pages/doctor/PrescribeMedicine';
import CreatePatientForm from 'pages/reception/CreatePatient';
import CreateAppointmentForm from 'pages/reception/CreateAppointment';

import { Medicines, NonMedicines, OtherAssets } from 'components/Inventory/Display';
import { allPermissions } from 'utils/constants';
import AddNewInventory from 'components/Inventory/AddNew';

export const checkAccess = (Auth, route) => {
  if (!Auth.isLoggedIn) {
    return false;
  }

  const userType = Auth.user.permissions;
  if (route.role.includes('*')) return true;
  if (userType === 'ADMIN') return true;
  const contains = route.role.some((role) => userType.includes(role));
  return contains;
};

const routes = [
  {
    path: '/me',
    component: ProfilePage,
    icon: <ProfileOutlined />,
    text: 'home',
    role: ['*'],
    props: {},
  },
  {
    path: '/admin/home',
    component: AdminHome,
    icon: <SettingOutlined />,
    text: 'Admin Home',
    showInNav: false,
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/receptionists',
    component: Receptionists,
    icon: <UserOutlined />,
    text: 'receptionists',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/doctors',
    component: Doctors,
    icon: <UserSwitchOutlined />,
    text: 'doctors',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/pharmacists',
    component: Pharmacists,
    icon: <UserAddOutlined />,
    text: 'pharmacists',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/inventory-managers',
    component: InventoryManagers,
    icon: <UserAddOutlined />,
    text: 'inventory_managers',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/co-admins',
    component: CoAdmins,
    icon: <SettingOutlined />,
    text: 'co_admins',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/others',
    component: Others,
    icon: <UserAddOutlined />,
    text: 'others',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/patients',
    component: Patients,
    icon: <UserOutlined />,
    text: 'patients',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/log-reports',
    component: LogReports,
    icon: <BookOutlined />,
    text: 'log_reports',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/admin/dev-config',
    component: DevConfig,
    icon: <SettingOutlined />,
    text: 'dev_config',
    role: [allPermissions.ADMIN.name],
    props: {},
  },
  {
    path: '/reception/add-appointment',
    component: CreateAppointmentForm,
    icon: <BookOutlined />,
    text: 'create_appointment',
    role: [allPermissions.RECEPTION_ADD_APPOINTMENT.name],
    props: {},
  },
  {
    path: '/doctor/appointments',
    component: DoctorAppointments,
    icon: <BookOutlined />,
    text: 'doctor_appointments',
    role: [allPermissions.DOCTOR_APPOINTMENTS.name],
    props: {},
  },
  {
    path: '/doctor/prescribe-medicine',
    component: PrescriptionForm,
    icon: <BookOutlined />,
    text: 'prescribe_medicines',
    role: [allPermissions.DOCTOR_PRESCRIBE_MEDICINE.name],
    props: {},
  },
  {
    path: '/patient',
    component: Patient,
    icon: <UserAddOutlined />,
    text: 'patient',
    role: ['PATIENT'],
    props: {},
  },
  {
    path: '/pharmacy/prescriptions',
    component: Prescriptions,
    icon: <BookOutlined />,
    text: 'pharmacy',
    role: [allPermissions.PHARMACY_PRESCRIPTIONS.name],
    props: {},
  },
  {
    path: '/pharmacy/receipt',
    component: CreateReceipts,
    icon: <BookOutlined />,
    text: 'create_receipts',
    role: [allPermissions.PHARMACY_RECEIPT.name],
    props: {},
  },
  {
    path: '/appointment/create-patient',
    component: CreatePatientForm,
    icon: <BookTwoTone />,
    text: 'create_patient',
    role: [allPermissions.RECEPTION_CREATE_PATIENT.name],
    props: {},
  },
  {
    path: '/inventory/new',
    component: AddNewInventory,
    icon: <WarningTwoTone />,
    text: 'add_to_inventory',
    role: [allPermissions.INVENTORY_ADD_MEDICINE.name],
    props: {},
  },
  {
    path: '/inventory/medicines',
    component: Medicines,
    icon: <MedicineBoxOutlined />,
    text: 'view_medicines',
    role: [allPermissions.INVENTORY_VIEW.name],
    props: {},
  },
  {
    path: '/inventory/non-medicines',
    component: NonMedicines,
    icon: <PlusCircleOutlined />,
    text: 'view_non_medicines',
    role: [allPermissions.INVENTORY_VIEW.name],
    props: {},
  },
  {
    path: '/inventory/other-assets',
    component: OtherAssets,
    icon: <DatabaseFilled />,
    text: 'view_other_assets',
    role: [allPermissions.INVENTORY_VIEW.name],
    props: {},
  },
  {
    path: '/patient/:id',
    component: Patient,
    icon: <UserAddOutlined />,
    text: 'patient',
    role: [allPermissions.DOCTOR_APPOINTMENTS.name],
    props: {},
    showInNav: false,
  },
];

export default routes;
