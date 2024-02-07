import {   
    SignupText,
    InputUserIdandNickNameBox,
    InputUserIdAndNickName,
    CheckButton,
    } from '../style';
import React from 'react';
import {Text} from 'react-native';
import { setEmail } from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';
import { checkIdDuplicate } from '../utils/isVaildateUtils';

interface InputUserIdProps {
    email: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
    checkIdDuplicateFn: (email: string) => void;
  }

export const InputUserId: React.FC<InputUserIdProps> = ({email,setFormData, checkIdDuplicateFn}) => {
    return (
         <>
            <SignupText>아이디(이메일)</SignupText>
                <InputUserIdandNickNameBox>
                    <InputUserIdAndNickName
                        placeholder="Email"
                        value={email}
                        onChangeText={(newEmail:string) => setEmail(setFormData, newEmail)} />
                    <CheckButton onPress={() => checkIdDuplicateFn(email)}>
                        <Text style={{color: "#749BC2"}}>중복확인</Text>
                    </CheckButton>
                </InputUserIdandNickNameBox>
        </>
    );
}