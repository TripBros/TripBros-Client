import { atom } from 'recoil';

export const userLoginState = atom({
  key: 'userAuth',
  default: false,
});