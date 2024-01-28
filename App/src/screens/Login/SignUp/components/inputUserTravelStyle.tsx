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
import { setlesrurely, setplanner, setadventurous, setvehicle, setphoto } from '../utils/SignUpFormUtils';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';

interface InputUserTravelStyleProps {
    leisurely_flag: boolean;
    planner_flag: boolean;
    adventurous_flag: boolean;
    vehicle_travel_flag: boolean;
    photo_preference_flag: boolean;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
}
export const InputUserTravelStyle: React.FC<InputUserTravelStyleProps> = (
    {leisurely_flag,planner_flag,adventurous_flag,vehicle_travel_flag,photo_preference_flag,setFormData}:InputUserTravelStyleProps
) => {
    return(
        <>
        <SignupText>여행 스타일</SignupText>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setlesrurely(setFormData,true)}
                            active={leisurely_flag === true}>
                            <Text>여유로운 일정</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setlesrurely(setFormData,false)}
                            active={leisurely_flag === false}>
                            <Text>빡빡한 일정</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setplanner(setFormData,true)}
                            active={planner_flag === true}>
                            <Text>계획적인</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setplanner(setFormData,false)}
                            active={planner_flag === false}>
                            <Text>즉흥적인</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setadventurous(setFormData,true)}
                            active={adventurous_flag === true}>
                            <Text>모험적인</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setadventurous(setFormData,false)}
                            active={adventurous_flag === false}>
                            <Text>안전한</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setvehicle(setFormData,true)}
                            active={vehicle_travel_flag === true}>
                            <Text>차량 선호</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setvehicle(setFormData,false)}
                            active={vehicle_travel_flag === false}>
                            <Text>대중교통 선호</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setphoto(setFormData,true)}
                            active={photo_preference_flag === true}>
                            <Text>사진 선호</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setphoto(setFormData,false)}
                            active={photo_preference_flag === false}>
                            <Text>사진 비선호</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
        </>
    );
}