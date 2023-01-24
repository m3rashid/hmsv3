import { atom } from "recoil";

const defaultUiState = {
  sidebarCollapsed: false,
};

export const uiState = atom({
  key: "uiState",
  default: defaultUiState,
});
