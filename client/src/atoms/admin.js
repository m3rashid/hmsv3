import { atom } from "recoil";

export const adminDefaultState = {
  receptionists: [],
  doctors: [],
  pharmacists: [],
  inventoryManagers: [],
  coAdmins: [],
  others: [],
  patients: [],
};

export const adminState = atom({
  key: "admin",
  default: adminDefaultState,
});
