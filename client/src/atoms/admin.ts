import { MODEL } from 'gatekeeper';
import { atom } from 'recoil';

export interface AdminState {
	receptionists: MODEL.Auth[];
	doctors: MODEL.Auth[];
	pharmacists: MODEL.Auth[];
	inventoryManagers: MODEL.Auth[];
	coAdmins: MODEL.Auth[];
	others: MODEL.Auth[];
	patients: MODEL.Auth[];
}

export const adminDefaultState: AdminState = {
  receptionists: [],
  doctors: [],
  pharmacists: [],
  inventoryManagers: [],
  coAdmins: [],
  others: [],
  patients: [],
};

export const adminState = atom<AdminState>({
  key: 'admin',
  default: adminDefaultState,
});
