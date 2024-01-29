import { atom } from 'recoil';

export const userLoginState = atom({
  key: 'userAuth',
  default: true,
});

export const userTokenState = atom({
  key: 'userToken',
  default: {
    accessToken: '',
    refreshToken: '',
  },
});

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    nickname: '',
    profileImage: '',
    travelStyle: [],
  },
});