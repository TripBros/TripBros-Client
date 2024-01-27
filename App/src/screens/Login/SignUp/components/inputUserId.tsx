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
import { setUserId } from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';

interface InputUserIdProps {
    userId: string;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
    checkIdDuplicate: (id: string) => void;
  }

export const InputUserId: React.FC<InputUserIdProps> = ({userId,setFormData, checkIdDuplicate}) => {
    return (
         <>
            <SignupText>아이디(이메일)</SignupText>
                <InputUserIdandNickNameBox>
                    <InputUserIdAndNickName
                        placeholder="Email"
                        value={userId}
                        onChangeText={(newUserId:string) => setUserId(setFormData, newUserId)} />
                    <CheckButton onPress={() => checkIdDuplicate(userId)}>
                        <Text style={{color: "#749BC2"}}>중복확인</Text>
                    </CheckButton>
                </InputUserIdandNickNameBox>
        </>
    );
}