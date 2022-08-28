import { atom } from "recoil";

export const doctorDefaultState = {
  appointments: [],
  loading: false,
};

export const doctorState = atom({
  key: "doctor",
  default: doctorDefaultState,
});
