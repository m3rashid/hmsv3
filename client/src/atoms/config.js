import { atom } from "recoil";

export const configDefaultState = {};

export const configState = atom({
  key: "config",
  default: configDefaultState,
});
