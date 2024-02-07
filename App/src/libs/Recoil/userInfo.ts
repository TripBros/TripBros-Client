import { atom } from 'recoil';
import { SignUpFormState } from '../../screens/Login/SignUp/types';

export const formDataState = atom<SignUpFormState>({
    key: 'formDataState', // 고유한 키
    default: {
      profileImage: null,
      email: '',
      password: '',
      nickname: '',
      birth: 0,
      sex: 'man',
      leisurely_flag: true,
      planner_flag: true,
      adventurous_flag: true,
      vehicle_travel_flag: true,
      photo_preference_flag: true,
    },
  });

  export interface IsSettingStateProps {
    isAllAlramState: boolean;
    isDisturbTimeState: boolean;
    isChatAlramState: boolean;
    isPostingAlramState: boolean;
  }

  export const isSettingState = atom<IsSettingStateProps>({
    key: 'isSettingState', // 고유한 키
    default:{
      isAllAlramState: false,
      isDisturbTimeState: false,
      isChatAlramState: false,
      isPostingAlramState: false,
    }
  })