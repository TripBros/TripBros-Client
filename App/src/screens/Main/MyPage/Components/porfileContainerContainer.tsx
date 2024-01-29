import React,{useState}from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
    MyPageContainer,
    ProfileContainer,
    ProfileImage,
    ProfileTextContainer,
    ProfileName,
    ProfileAgeandSex,
    ProfileTravelStyleContainerContainer,
    ProfileTravelStyleContainer,
    ProfileTravelStyleTextContainer,
    ProfileTravelStyleText,
    ProfileModifyContainer,
    ProfileModifyButton,
    ProfileModifyText,
    MyPageMenuContainer,
    ProfileSettingButton,
    ProfileSettingText
} from '../styles';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../libs/Recoil/authState';

//icon
import { AntDesign } from '@expo/vector-icons';

interface ProfileProps {
    userLoginState: boolean;
}

const ProfileContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const navigation = useNavigation();
    const user = useRecoilValue(userState);
    
    // 로직 추가햐아함
    const [needProfile,useNeedProfile] = useState({
        nickname: '김민수',
        sex: '남자',
        age: '25',
    });

    if(!userLoginState){
        return (
            <ProfileContainer>
                <ProfileImage source={''} />
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
    return (
        <ProfileContainer>
                <ProfileImage source={''} />
                <ProfileTextContainer>
                    <ProfileName>{needProfile.nickname}</ProfileName>
                    <ProfileAgeandSex>{needProfile.age} {needProfile.sex}</ProfileAgeandSex>
                </ProfileTextContainer>
            </ProfileContainer>

    );
};

export default ProfileContainerContainer;
