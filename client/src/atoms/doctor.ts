import { MODEL } from 'gatekeeper';
import { atom } from 'recoil';

export interface DoctorState {
	appointments: MODEL.Appointment[];
	list: any[];
	loading: boolean;
}

export const doctorDefaultState: DoctorState = {
  appointments: [],
  list: [],
  loading: false,
};

export const doctorState = atom<DoctorState>({
  key: 'doctor',
  default: doctorDefaultState,
});
