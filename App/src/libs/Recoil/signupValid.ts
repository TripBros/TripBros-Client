import {atom} from 'recoil';
import { IsValidationProps } from '../../screens/Login/SignUp/types';

export const IsValidationState= atom<IsValidationProps>({
    key: 'IsValidationState',
    default: {
        isEmail: false,
        isPassword: false,
        isPasswordConfirm: false,
        isNickname: false,
    },
    });