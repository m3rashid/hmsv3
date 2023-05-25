import { atom } from 'recoil';

export const authDefaultState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authState = atom({
  key: 'auth',
  default: authDefaultState,
});
