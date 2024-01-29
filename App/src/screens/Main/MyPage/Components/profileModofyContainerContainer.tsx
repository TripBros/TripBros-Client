import React from 'react';
import styled from 'styled-components/native';
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

interface ProfileProps {
    userLoginState: boolean;
}

const ProfileModifyContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const navigation = useNavigation();

    if(!userLoginState){
        return (
            <ProfileModifyContainer>
                <BeforeProfileModifyContainer>
                    <BeforeProfileModifyTextBox>
                        <BeforeProfileModifyText style={{color:'#749BC2'}}>동행 모집 게시글</BeforeProfileModifyText>
                        <BeforeProfileModifyText>을 작성하거나,</BeforeProfileModifyText>
                    </BeforeProfileModifyTextBox>
                    <BeforeProfileModifyTextBox>
                        <BeforeProfileModifyText>여행스타일을 고려한</BeforeProfileModifyText>
                        <BeforeProfileModifyText style={{color:'#749BC2'}}> 모집 게시글을 추천 </BeforeProfileModifyText>
                        <BeforeProfileModifyText>받을 수 있어요</BeforeProfileModifyText>
                    </BeforeProfileModifyTextBox>
                </BeforeProfileModifyContainer>
            </ProfileModifyContainer>
        );
    }
    
    return (
        <ProfileModifyContainer>
            <ProfileModifyButton
                onPress={() => navigation.navigate('ModifyProfile')}
            >
                <ProfileModifyText>프로필 수정</ProfileModifyText>
            </ProfileModifyButton>
        </ProfileModifyContainer>
    );
};

export default ProfileModifyContainerContainer;

const BeforeProfileModifyContainer = styled.View`
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;

const BeforeProfileModifyTextBox= styled.View`
    width: 100%;
    flex-direction: row;
    margin-bottom: 5px;
    margin-left: 25px;
`;

const BeforeProfileModifyText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

