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

interface InputUserIdProps {
    email: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
    checkIdDuplicate: (email: string) => void;
  }

export const InputUserId: React.FC<InputUserIdProps> = ({email,setFormData, checkIdDuplicate}) => {
    return (
         <>
            <SignupText>아이디(이메일)</SignupText>
                <InputUserIdandNickNameBox>
                    <InputUserIdAndNickName
                        placeholder="Email"
                        value={email}
                        onChangeText={(newEmail:string) => setEmail(setFormData, newEmail)} />
                    <CheckButton onPress={() => checkIdDuplicate(email)}>
                        <Text style={{color: "#749BC2"}}>중복확인</Text>
                    </CheckButton>
                </InputUserIdandNickNameBox>
        </>
    );
}