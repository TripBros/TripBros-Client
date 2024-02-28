import { atom } from 'recoil';

export const userLoginState = atom({
  key: 'userLogin',
  default: false,
});

export const userTokenState = atom({
  key: 'userToken',
  default: {
    "grantType": '',
    "accessToken": '',
    // "refreshToken": '',
  }
});