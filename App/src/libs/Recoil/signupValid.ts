import {atom} from 'recoil';
import { isValidationProps } from '../../screens/Login/SignUp/types';

export const isValidationState= atom<isValidationProps>({
    key: 'isValidationState',
    default: {
        isEmail: false,
        isPassword: false,
        isPasswordConfirm: false,
        isNickname: false,
    },
    });