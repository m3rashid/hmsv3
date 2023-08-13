import { atom } from 'recoil';

export const configDefaultState: any = {};

export const configState = atom({
  key: 'config',
  default: configDefaultState,
});
