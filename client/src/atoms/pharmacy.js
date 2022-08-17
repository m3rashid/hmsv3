import { atom } from "recoil";

export const pharmacyDefaultState = {
  prescriptions: [],
};

export const pharmacyState = atom({
  key: "pharmacy",
  default: pharmacyDefaultState,
});
