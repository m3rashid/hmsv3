import { atom } from 'recoil';

export const receptionDefaultState = {
  activeAppointments: [],
  completedAppointments: [],
};

export const receptionState = atom({
  key: 'reception',
  default: receptionDefaultState,
});
