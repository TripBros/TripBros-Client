import { SignInFormProps } from '../types';

// 로그인 폼 상태 업데이트
const handleInputChange = (
    setStateFunction: React.Dispatch<React.SetStateAction<SignInFormProps>>,
    field: keyof SignInFormProps,
     value: string) => {
    setStateFunction((prevState:SignInFormProps) => ({
    ...prevState,
    [field]: value
    }));
}
const setUserId = (
    setStateFunction: React.Dispatch<React.SetStateAction<SignInFormProps>>,
    value: string) => handleInputChange(setStateFunction,'email', value);
const setPassword = (
    setStateFunction: React.Dispatch<React.SetStateAction<SignInFormProps>>,
    value: string) => handleInputChange(setStateFunction,'password', value);

export {
    setUserId,
    setPassword,
}