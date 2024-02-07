import React,{useEffect, useState} from 'react';
import { View, Text,ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';
import { InputUserProfileImage } from '../../../Login/SignUp/components/inputUserProfileImage';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';
import defaultProfileImage from '.././../../../assets/basicProfile.jpg';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigators/RootNavigator';
import * as ImagePicker from 'expo-image-picker';

interface UserProfile {
    profileImage: string | null;
    email: string;
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
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = useRecoilValue(userTokenState);
    
    // 유저 데이터 상태
    const [UserInfo,setUserInfo] = useState<UserProfile>({
        profileImage: null,
        email: '',
        password: '',
        nickname: '',
        sex: '',    
        birth: 0,
        leisurely_flag: false,
        planner_flag: false,
        adventurous_flag: false,
        vehicle_travel_flag: false,
        photo_preference_flag: false,
    });

    const handleSubmit = async() => {
        try {
            const response = await axios.post('유저 정보 업데이트 주소', UserInfo, {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
    
            console.log('변경사항 저장');
    
            if (response.data.success) {
                console.log('업데이트 성공');
                navigation.navigate('Main');
            } else {
                throw new Error('업데이트 실패');
            }
        } catch (error) {
            console.error('업데이트 중 오류 발생:', error);
            Alert.alert('업데이트에 실패했습니다. 다시 시도해주세요.');
    };
};

    //닉네임 중복확인을 위한 장치
    const [tmpNickname,setTmpNickname] = useState<string>('');
    const checkNicknameDuplication = async () => {
        console.log('중복확인 시도');
        try {
          const response = await axios.post('닉네임 중복 체크 주소',  tmpNickname );
          console.log('닉네임 중복 확인 성공:', response.data);
          if (response.data.success) { // 성공 여부를 확인하는 로직을 추가했습니다.
            alert('사용 가능한 닉네임입니다.');
          } else {
            alert('이미 사용 중인 닉네임입니다.'); // 중복일 경우의 처리를 추가했습니다.
          }
        } catch (error) {
          console.error('닉네임 중복 확인 실패:', error);
          alert('닉네임 중복 확인 중 오류가 발생했습니다.'); // 사용자에게 에러 상황을 알리는 처리를 추가했습니다.
        }
      };
    
    
    // getProfile 함수 정의
    async function getProfile(accesstoken: string): Promise<UserProfile> {
        const response = await axios.post<UserProfile>('/api/user/profile', {}, {
        headers: {
            Authorization: `Bearer ${accesstoken}`,
        },
        });
        return response.data;
    }

    //변경할 이미지 업로드
    const uploadImage = async () => {
        // 사용자 권한 요청
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert('사진 접근 권한이 필요합니다!');
          return;
        }
      
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        // result.canceled가 false이고, result.assets이 null이 아닌 경우에만 실행
        if (!result.canceled && result.assets) {
          // 옵셔널 체이닝을 사용하여 result.assets[0]?.uri 접근
          const imageUri = result.assets[0]?.uri;
          if (imageUri) { // imageUri가 존재하는지 확인
            setUserInfo(prevState => ({
              ...prevState,
              profileImage: imageUri
            }));
            console.log(imageUri, '이미지');
          }
        }
    };
    

    useEffect(() => {
        getProfile(token.accessToken).then((response) => {
            setUserInfo(response);
        });
    }
    ,[]);
    
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="프로필 수정"/>
            <ModifyProfileBlock>
                <ModifyProfileForm>
                    <ProfileImageContainer>
                        <ModifyFormText>프로필 사진</ModifyFormText>
                        <ProfileImageBox>
                            <ProfileImage source={UserInfo.profileImage ? {uri :UserInfo.profileImage}  : defaultProfileImage}/>
                            <ProfileImageInputButtun onPress={uploadImage}>
                                <Text>프로필 사진 변경</Text>
                            </ProfileImageInputButtun>
                        </ProfileImageBox>
                    </ProfileImageContainer>
                    <ProfileEmailContainer>
                        <ProfileEmailTextContainer>
                            <ModifyFormText>아이디(이메일)</ModifyFormText>
                            <ProfileEmailText style={{color: 'red', fontSize:'14',marginLeft:'30' }}>수정이 불가합니다</ProfileEmailText>
                        </ProfileEmailTextContainer>
                            <ProfileEmailBox>
                                <ProfileEmail>{UserInfo.email}</ProfileEmail>
                            </ProfileEmailBox>
                    </ProfileEmailContainer>
                    <ModifyPasswordButton 
                        onPress={() => navigation.navigate('ModifyPasswordConfirm',{userPassword: UserInfo.password})}>
                        <Text style={{color: "#749BC2"}}>비밀번호 변경</Text>
                    </ModifyPasswordButton>
                    <ProfileNewNickNameContainer>
                        <ModifyFormText>닉네임</ModifyFormText>
                        <ProfileNewNickNameBox>
                            <ModifyProfileNickname
                                placeholder={UserInfo.nickname}
                                value={tmpNickname}
                                onChangeText={setTmpNickname} // 사용자 입력에 따라 nickname 상태 업데이트
                            />
                            <CheckButton onPress={checkNicknameDuplication}>
                                <Text style={{color: "#749BC2"}}>중복확인</Text>
                            </CheckButton>
                        </ProfileNewNickNameBox>
                    </ProfileNewNickNameContainer>
                    <ModifyTravelStyleBlock>
                        <ModifyFormText>여행 스타일</ModifyFormText>
                        <TravelStyleBlock>
                            <TravelStyleCheckBox
                                onPress={() => 
                                    setUserInfo(currentState => ({
                                        ...currentState,
                                        leisurely_flag: true}))}
                                active={UserInfo.leisurely_flag === true}>
                                <Text>여유로운 일정</Text>
                            </TravelStyleCheckBox>
                            <TravelStyleCheckBox
                                onPress={() => 
                                    setUserInfo(currentState => ({
                                        ...currentState,
                                        leisurely_flag: false}))}
                                active={UserInfo.leisurely_flag === false}>
                                <Text>빡빡한 일정</Text>
                            </TravelStyleCheckBox>
                        </TravelStyleBlock>
                        <TravelStyleBlock>
                            <TravelStyleCheckBox
                                onPress={() => 
                                    setUserInfo(currentState => ({
                                        ...currentState,
                                        planner_flag: true}))}
                                active={UserInfo.planner_flag === true}>
                                <Text>계획적인</Text>
                            </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    planner_flag: false}))}
                            active={UserInfo.planner_flag === false}>
                            <Text>즉흥적인</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    adventurous_flag: true}))}
                            active={UserInfo.adventurous_flag === true}>
                            <Text>모험적인</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    adventurous_flag: false}))}
                            active={UserInfo.adventurous_flag === false}>
                            <Text>안전한</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    vehicle_travel_flag: true}))}
                            active={UserInfo.vehicle_travel_flag === true}>
                            <Text>차량 선호</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    vehicle_travel_flag: false}))}
                            active={UserInfo.vehicle_travel_flag === false}>
                            <Text>대중교통 선호</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    photo_preference_flag: true}))}
                            active={UserInfo.photo_preference_flag === true}>
                            <Text>사진 선호</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => 
                                setUserInfo(currentState => ({
                                    ...currentState,
                                    photo_preference_flag: false}))}
                            active={UserInfo.photo_preference_flag === false}>
                            <Text>사진 비선호</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    </ModifyTravelStyleBlock>
                    <FormButton
                        title="회원가입"
                        onPress={handleSubmit}
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

const ModifyFormText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ProfileImageContainer = styled.View`
    width: 100%;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;

const ProfileImageBox = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 20px;
`;

const ProfileImageInputButtun = styled.TouchableOpacity`
    width: 140px;
    height: 33px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #A6A6A6;
    align-items: center;
    justify-content: center;
`;

const ProfileEmailContainer = styled.View`
    width: 100%;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;
  
const ProfileEmailTextContainer = styled.View`
    width: 100%;
    flex-direction: row;
`;
const ProfileEmailText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    color: #000;
    margin-right: 10px;
`;
const ProfileEmailBox = styled.View`
    width: 100%;
    font-size: 14px;
    padding: 0 5px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
    display: flex;
    justify-content: center;

`;

const ProfileEmail = styled.Text`
    width: 100%;
    font-size: 18px;
    color: #A6A6A6;
`;

const ModifyPasswordButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
`;

const ProfileNewNickNameContainer = styled.View`
    width: 100%;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;

const ProfileNewNickNameText = styled.Text`
    heigth: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    margin-right: 10px;
`;

const ProfileNewNickNameBox = styled.View`
    width: 100%;
    font-size: 14px;
    padding: 0 5px;
    margin-bottom: 20px;
    background-color: #FFFFFF; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ModifyProfileNickname = styled.TextInput`
    width: 70%;
    font-size: 14px;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
`;

const CheckButton = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    margin-left : 10px;
    margin-bottom: 10px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
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

const ModifyTravelStyleBlock = styled.View`
    width: 100%;
    padding: 10px;
    justifyContent: 'center';
    alignItems: 'center';
`;

const TravelStyleBlock = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

interface TravelStyleCheckBoxProps {
    active: boolean;
  }

const TravelStyleCheckBox = styled.TouchableOpacity<TravelStyleCheckBoxProps>`
    width: 48%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid  ${props => props.active ? '#749BC2' : '#D8D8D8'};
    align-items: center;
    justify-content: center;
`;