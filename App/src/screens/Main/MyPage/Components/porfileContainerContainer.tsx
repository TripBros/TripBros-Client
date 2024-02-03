import React,{useEffect, useState}from 'react';
import { TouchableOpacity } from 'react-native';
import {
    ProfileContainer,
    ProfileImage,
    ProfileTextContainer,
    ProfileName,
    ProfileAgeandSex,
} from '../styles';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigators/RootNavigator';
import defaultProfileImage from '../../../../assets/basicProfile.jpg';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../../utils/constants';
//icon
import { AntDesign } from '@expo/vector-icons';

interface ProfileProps {
    userLoginState: boolean;
}

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

// 마이페이지에서 뿌려질 상태
interface Profile {
  nickname: string;
  sex: string;
  birth: number;
  profileImage: string | null;
}

const ProfileContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    //토큰
    const token = useRecoilValue(userTokenState);

    // getProfile 함수 정의
    async function getProfile(token: string): Promise<UserProfile> {
        const response = await axios.post<UserProfile>(`${SERVER_BASE_URL}/api/user/profile`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    }
    //프로필 상태
    const [needProfile,useNeedProfile] = useState<Profile>({
        nickname: '김민수',
        sex: '남자',
        birth: 25,
        profileImage: null,
    });

    if(!userLoginState){
        return (
            <ProfileContainer>
                <ProfileImage source={defaultProfileImage} />
                <ProfileTextContainer>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}  
                        onPress={() => navigation.navigate('SignIn')}>
                        <ProfileName>로그인 하기</ProfileName>
                        <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity>
                </ProfileTextContainer>
            </ProfileContainer>
        );
    }
    else {

        useEffect(() => {
            getProfile(token).then((data) => {
                useNeedProfile({
                    nickname: data.nickname,
                    sex:data.sex,
                    birth:data.birth,
                    profileImage: data.profileImage,
                })})});
    return (
        <ProfileContainer>
                <ProfileImage source={ needProfile.profileImage ? {uri :needProfile.profileImage}  : defaultProfileImage} />
                <ProfileTextContainer>
                    <ProfileName>{needProfile.nickname}</ProfileName>
                    <ProfileAgeandSex>{needProfile.birth} {needProfile.sex}</ProfileAgeandSex>
                </ProfileTextContainer>
            </ProfileContainer>

    );
};
};

export default ProfileContainerContainer;
