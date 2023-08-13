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
import AddNewInventory from 'components/Inventory/AddNew';
import { Permission } from 'gatekeeper';

interface Route {
	path: string;
	component: any;
	icon: any;
	text: string;
	role: Array<Permission | '*' | 'PATIENT'>;
	props: any;
	showInNav?: boolean;
}

export const checkAccess = (Auth, route: Route) => {
  if (!Auth.isLoggedIn) {
    return false;
  }

  const userType = Auth.user.permissions;
  if (route.role.includes('*')) return true;
  if (userType === 'ADMIN') return true;
  const contains = route.role.some((role) => userType.includes(role));
  return contains;
};

const routes: Route[] = [
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
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/receptionists',
		component: Receptionists,
		icon: <UserOutlined />,
		text: 'receptionists',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/doctors',
		component: Doctors,
		icon: <UserSwitchOutlined />,
		text: 'doctors',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/pharmacists',
		component: Pharmacists,
		icon: <UserAddOutlined />,
		text: 'pharmacists',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/inventory-managers',
		component: InventoryManagers,
		icon: <UserAddOutlined />,
		text: 'inventory_managers',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/co-admins',
		component: CoAdmins,
		icon: <SettingOutlined />,
		text: 'co_admins',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/others',
		component: Others,
		icon: <UserAddOutlined />,
		text: 'others',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/patients',
		component: Patients,
		icon: <UserOutlined />,
		text: 'patients',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/log-reports',
		component: LogReports,
		icon: <BookOutlined />,
		text: 'log_reports',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/admin/dev-config',
		component: DevConfig,
		icon: <SettingOutlined />,
		text: 'dev_config',
		role: ['ADMIN'],
		props: {},
	},
	{
		path: '/reception/add-appointment',
		component: CreateAppointmentForm,
		icon: <BookOutlined />,
		text: 'create_appointment',
		role: ['RECEPTION_ADD_APPOINTMENT'],
		props: {},
	},
	{
		path: '/doctor/appointments',
		component: DoctorAppointments,
		icon: <BookOutlined />,
		text: 'doctor_appointments',
		role: ['DOCTOR_APPOINTMENTS'],
		props: {},
	},
	{
		path: '/doctor/prescribe-medicine',
		component: PrescriptionForm,
		icon: <BookOutlined />,
		text: 'prescribe_medicines',
		role: ['DOCTOR_PRESCRIBE_MEDICINE'],
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
		role: ['PHARMACY_PRESCRIPTIONS'],
		props: {},
	},
	{
		path: '/pharmacy/receipt',
		component: CreateReceipts,
		icon: <BookOutlined />,
		text: 'create_receipts',
		role: ['PHARMACY_RECEIPT'],
		props: {},
	},
	{
		path: '/appointment/create-patient',
		component: CreatePatientForm,
		icon: <BookTwoTone />,
		text: 'create_patient',
		role: ['RECEPTION_CREATE_PATIENT'],
		props: {},
	},
	{
		path: '/inventory/new',
		component: AddNewInventory,
		icon: <WarningTwoTone />,
		text: 'add_to_inventory',
		role: ['INVENTORY_ADD_MEDICINE'],
		props: {},
	},
	{
		path: '/inventory/medicines',
		component: Medicines,
		icon: <MedicineBoxOutlined />,
		text: 'view_medicines',
		role: ['INVENTORY_VIEW'],
		props: {},
	},
	{
		path: '/inventory/non-medicines',
		component: NonMedicines,
		icon: <PlusCircleOutlined />,
		text: 'view_non_medicines',
		role: ['INVENTORY_VIEW'],
		props: {},
	},
	{
		path: '/inventory/other-assets',
		component: OtherAssets,
		icon: <DatabaseFilled />,
		text: 'view_other_assets',
		role: ['INVENTORY_VIEW'],
		props: {},
	},
	{
		path: '/patient/:id',
		component: Patient,
		icon: <UserAddOutlined />,
		text: 'patient',
		role: ['DOCTOR_APPOINTMENTS'],
		props: {},
		showInNav: false,
	},
];

export default routes;
