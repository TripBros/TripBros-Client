import { atom } from 'recoil';

export const userLoginState = atom({
  key: 'userAuth',
  default: true,
});

export const userTokenState = atom({
  key: 'userToken',
  default: {
    "grantType": '',
    "accessToken": '',
    // "refreshToken": '',
  }
});