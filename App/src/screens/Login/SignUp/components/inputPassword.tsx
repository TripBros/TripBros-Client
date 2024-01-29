import {   
    SignupBlock,
    SignupForm,
    SignupText,
    ProfileImageBox,
    ProfileImage,
    ProfileImageInputButtun,
    InputUserIdandNickNameBox,
    InputUserIdAndNickName,
    CheckButton,
    InputUser,
    YearChooseBox,
    ChooserSexBox,
    SexCheckButton,
    FormButton,
    FormSignupText,
    TravelStyleBlock,
    TravelStyleCheckBox,
    AgreementBlock,
    AgreementBox,
    AgreementText,
    AgreementButton,
    } from '../style';
import { setPassword} from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';

interface InputUserPasswordProps {
    password: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
  }

export const InputUserPassword: React.FC<InputUserPasswordProps> = ({password,setFormData}) => {
    return (
        <>
             <SignupText>비밀번호</SignupText>
                    <InputUser
                        secureTextEntry={true}
                        placeholder="영문,숫자,특수문자 포함 8자리 이상"
                        value={password}
                        onChangeText={(newPassword:string) => setPassword(setFormData,newPassword)} />  
        </>
    );
}