import { atom } from "recoil";

export const doctorDefaultState = {
  appointments: [],
};

export const doctorState = atom({
  key: "doctor",
  default: doctorDefaultState,
});
