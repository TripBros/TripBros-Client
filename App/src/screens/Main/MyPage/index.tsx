import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

//전역상태관리 (로그인한 유저정보, 로그인상태, 토큰)
import { userLoginState, userState,userTokenState } from '../../../libs/Recoil/authState';
import { useRecoilValue } from 'recoil';
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
} from './styles';
import ProfileContainerContainer from './Components/porfileContainerContainer';
import ProfileTravelStyleContainerContainerContainer from './Components/profileTravelStyleContainerContainerContainer';
import MyPageMenuContainerContainer from './Components/myPageMenuContainerContainer';
import ProfileModifyContainerContainer from './Components/profileModofyContainerContainer';

const MyPage: React.FC = () => {

    //유저정보, 로그인상태, 토큰
    const user = useRecoilValue(userState);
    const userLogin = useRecoilValue(userLoginState);
    const userToken = useRecoilValue(userTokenState);

    return (
        <MyPageContainer>
            <ProfileContainerContainer userLoginState={userLogin} />
            <ProfileTravelStyleContainerContainerContainer userLoginState={userLogin}/>
            <ProfileModifyContainerContainer userLoginState={userLogin} />
            <MyPageMenuContainerContainer userLoginState={userLogin}/>
        </MyPageContainer>
    )
};

export default MyPage;

