import {   
    SignupText,
    ChooserSexBox,
    SexCheckButton,
    } from '../style';
import React from 'react';      
import {Text} from 'react-native';
import { setSex } from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';

interface InputUserSexProps {
    sex: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
}

export const InputUserSex: React.FC<InputUserSexProps> = ({sex,setFormData}) => {
    return (
        <>
            <SignupText>성별</SignupText>
            <ChooserSexBox>
            <SexCheckButton 
                onPress={() => setSex(setFormData,'Male')}
                active={sex === 'Male'}
                >
                <Text style={{color: sex === 'Male' ? 'white' : '#749BC2'}}>남자</Text>
            </SexCheckButton>
            <SexCheckButton 
                onPress={() => setSex(setFormData,'Female')}
                active={sex === 'Female'}>
                <Text style={{color: sex === 'Female' ? 'white' : '#749BC2'}}>여자</Text>
            </SexCheckButton>
            </ChooserSexBox>
        </>
    );
}