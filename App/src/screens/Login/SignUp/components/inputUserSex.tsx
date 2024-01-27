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
                onPress={() => setSex(setFormData,true)}
                active={sex === 'man'}
                >
                <Text style={{color: sex === 'man' ? 'white' : '#749BC2'}}>남자</Text>
            </SexCheckButton>
            <SexCheckButton 
                onPress={() => setSex(setFormData,false)}
                active={sex === 'woman'}>
                <Text style={{color: sex === 'woman' ? 'white' : '#749BC2'}}>여자</Text>
            </SexCheckButton>
            </ChooserSexBox>
        </>
    );
}