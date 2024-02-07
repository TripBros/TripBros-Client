import { atom } from 'recoil';

export const userLoginState = atom({
  key: 'userAuth',
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