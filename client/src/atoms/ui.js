import { atom } from 'recoil';

const defaultUiState = {
  sidebarCollapsed: false,
  isMobile: window.innerWidth < 500,
};

export const uiState = atom({
  key: 'uiState',
  default: defaultUiState,
});
