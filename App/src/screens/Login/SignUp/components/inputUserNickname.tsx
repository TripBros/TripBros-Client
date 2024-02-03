import {   
    SignupText,
    InputUserIdandNickNameBox,
    InputUserIdAndNickName,
    CheckButton,
    } from '../style';
import React from 'react';
import {Text} from 'react-native';
import { setNickname } from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';

interface InputUserNicknameProps {
    nickname: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
    checkNicknameDuplicate: (nickname: string) => void;
  }

export const InputUserNickName: React.FC<InputUserNicknameProps> = ({nickname,setFormData,checkNicknameDuplicate}) => {
    return (
        <>
            <SignupText>닉네임</SignupText>
                <InputUserIdandNickNameBox>
                    <InputUserIdAndNickName
                        placeholder="닉네임"
                        value={nickname}
                        onChangeText={(newNickname:string) => setNickname(setFormData,newNickname)}/>
                    <CheckButton onPress={() => checkNicknameDuplicate(nickname)}>
                        <Text style={{color: "#749BC2"}}>중복확인</Text>
                    </CheckButton>
                </InputUserIdandNickNameBox>
        </>
    );
}