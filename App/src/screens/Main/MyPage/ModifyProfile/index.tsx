import React,{useState} from 'react';
import { View, Text,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';
import { InputUserProfileImage } from '../../../Login/SignUp/components/inputUserProfileImage';
import { InputUserNickName } from '../../../Login/SignUp/components/inputUserNickname';
import { InputUserTravelStyle } from '../../../Login/SignUp/components/inputUserTravelStyle';
import { Dispatch, SetStateAction } from 'react';

interface ModifyFormState {
    profileImage: string | null;
    userId: string;
    password: string;
    nickname: string;
    birth: number;
    sex: string;
    leisurely_flag: boolean;
    planner_flag: boolean;
    adventurous_flag: boolean;
    vehicle_travel_flag: boolean;
    photo_preference_flag: boolean;
}

const ModifyProfile: React.FC = () => {
    const [modifyFormData, setModifyFormData] = useState<ModifyFormState>({
        profileImage: null,
        userId: 'sad@sasd.sadas',
        password: '',
        nickname: '',
        birth: 0,
        sex: 'man',
        leisurely_flag: true,
        planner_flag: true,
        adventurous_flag: true,
        vehicle_travel_flag: true,
        photo_preference_flag: true,
    });

    // formData에서 일단 수정하고
    // 수정한 formData를 서버로 보내야함
    // 서버에서 받아오면 수정한 formData를 userState에 저장해야함
    
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="프로필 수정"/>
            <ModifyProfileBlock>
                <ModifyProfileForm>
                    <InputUserProfileImage profileImage={modifyFormData.profileImage} setFormData={setModifyFormData}/>
                    <ProfileEmailContainer>
                        <ProfileEmailTextContainer>
                            <ProfileEmailText style={{fontWeight:'bold'}}>아이디(이메일)</ProfileEmailText>
                            <ProfileEmailText style={{color: 'red', fontSize:'14px' }}>수정이 불가합니다</ProfileEmailText>
                        </ProfileEmailTextContainer>
                        <ProfileEmailBox>
                            <ProfileEmail>{modifyFormData.userId}</ProfileEmail>
                        </ProfileEmailBox>
                    </ProfileEmailContainer>
                    <ProfileNowPasswordContainer>
                        <ProfileNowPasswordText>현재 비밀번호</ProfileNowPasswordText>
                        <ProfileNowPasswordBox
                            secureTextEntry={true}
                            placeholder="현재 비밀번호"
                            onChangeText={(text) => setModifyFormData({...modifyFormData, password: text})}
                            value={modifyFormData.password}
                        />
                    </ProfileNowPasswordContainer>
                    <ProfileNewPasswordContainer>
                        <ProfileNewPasswordText>새 비밀번호</ProfileNewPasswordText>
                        <ProfileNewPasswordBox
                            secureTextEntry={true}
                            placeholder="영문, 숫자 포함 8자 이상"
                            onChangeText={(text) => setModifyFormData({...modifyFormData, password: text})}
                            value={modifyFormData.password}
                        />
                        <ProfileNewPasswordBox
                            secureTextEntry={true}
                            placeholder="새 비밀번호 확인"
                            onChangeText={(text) => setModifyFormData({...modifyFormData, password: text})}
                            value={modifyFormData.password}
                        />
                    </ProfileNewPasswordContainer>
                    <ProfileNewNickNameContainer>
                        <InputUserNickName nickname={modifyFormData.nickname} setFormData ={setModifyFormData} checkNicknameDuplicate={()=>console.log('아이디 중복체크')}/>
                    </ProfileNewNickNameContainer>
                    <InputUserTravelStyle
                        leisurely_flag={modifyFormData.leisurely_flag}
                        planner_flag={modifyFormData.planner_flag}
                        adventurous_flag={modifyFormData.adventurous_flag}
                        vehicle_travel_flag={modifyFormData.vehicle_travel_flag}
                        photo_preference_flag={modifyFormData.photo_preference_flag}
                        setFormData={setModifyFormData}
                        />
                    <FormButton
                        title="회원가입"
                        onPress={() => console.log('변경사항 저장')}
                        >
                        <FormSignupText>변경사항 저장</FormSignupText>
                    </FormButton>
                </ModifyProfileForm>
            </ModifyProfileBlock>
        </SafeAreaView>
    );
};

export default ModifyProfile;

const contentStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

const ModifyProfileBlock = styled(ScrollView).attrs({
    contentContainerStyle: contentStyles,
  })`
    flex: 1;
    background-color: #fff;
  `;
const ModifyProfileForm = styled.View`
    width: 100%;
    height: 100%;
    padding: 20px;
    justifyContent: 'center';
    alignItems: 'center';   
`;

const ProfileEmailContainer = styled.View`
    width: 100%;
    height: 100px;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;
  
const ProfileEmailTextContainer = styled.View`
    width: 100%;
    height: 20px;
    flex-direction: row;
`;
const ProfileEmailText = styled.Text`
    font-size: 16px;
    color: #000;
    margin-right: 10px;
`;
const ProfileEmailBox = styled.View`
    width: 100%;
    height: 40;
    font-size: 14px;
    padding: 0 5px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
    display: flex;
    justify-content: center;

`;

const ProfileEmail = styled.Text`
    font-size: 18px;
    color: #A6A6A6;
`;

const ProfileNowPasswordContainer = styled.View`
    width: 100%;
    height: 100px;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;  

const ProfileNowPasswordText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-right: 10px;
`;

const ProfileNowPasswordBox = styled.TextInput`
    width: 100%;
    height: 40;
    font-size: 14px;
    padding: 0 5px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
    display: flex;
    justify-content: center;
`;


const ProfileNewPasswordContainer = styled.View`
    width: 100%;
    height: 100px;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;
const ProfileNewPasswordBox = styled.TextInput`
    width: 100%;
    height: 40;
    font-size: 14px;
    padding: 0 5px;
    margin-top: 15px;
    border: 1px solid #A6A6A6;
    border-radius: 8px;
    background-color: #FFFFFF; 
    display: flex;
    justify-content: center;
`;
const ProfileNewPasswordText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-right: 10px;
`;

const ProfileNewNickNameContainer = styled.View`
    width: 100%;
    height: 100px;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
    margin-top: 65px;
`;

const FormButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #91C8E4;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    /* iOS 그림자 스타일 */
    shadow-color: #000;
    shadow-offset: 2px 2px;
    shadow-opacity: 0.3;
    shadow-radius: 4.65px;

    /* Android 그림자 스타일 */
    elevation: 8;
`;

const FormSignupText = styled.Text`
  font-size: 20px; 
  font-weight: bold;
  color: #fff;
  
`;