import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

//icon
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

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

const MyPage: React.FC = () => {
    const navigation = useNavigation();

    // 전역상태관리로 ProfileProps 받아와서 사용 {이미지,닉네임,성별,나이,여행스타일}
    return (
        <MyPageContainer>
            <ProfileContainer>
                <ProfileImage source={''} />
                <ProfileTextContainer>
                    <ProfileName>김민수</ProfileName>
                    <ProfileAgeandSex>25세 남자</ProfileAgeandSex>
                </ProfileTextContainer>
            </ProfileContainer>
            <ProfileTravelStyleContainerContainer>
                <ProfileTravelStyleContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>1</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>2</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>3</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                </ProfileTravelStyleContainer>
                <ProfileTravelStyleContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>4</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>5</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                </ProfileTravelStyleContainer>
            </ProfileTravelStyleContainerContainer>
            <ProfileModifyContainer>
                <ProfileModifyButton
                    onPress={() => navigation.navigate('ModifyProfile')}
                    >
                    <ProfileModifyText>프로필 수정</ProfileModifyText>
                </ProfileModifyButton>
            </ProfileModifyContainer>
            <MyPageMenuContainer>
                <ProfileSettingButton 
                    onPress={() => navigation.navigate('Myposts')}
                    >
                    <Entypo name="pencil" size={24} color="black" />
                    <ProfileSettingText>내가 작성한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('BookmarkPlaces')}
                    >
                    <MaterialCommunityIcons name="bookmark-outline" size={24} color="black" />
                    <ProfileSettingText>내가 저장한 장소</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('LikePosts')}
                    >
                    <AntDesign name="hearto" size={24} color="black" />
                    <ProfileSettingText>내가 좋아요한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('Setting')}
                    >
                    <Feather name="settings" size={24} color="black" />
                    <ProfileSettingText>설정</ProfileSettingText>
                </ProfileSettingButton>
            </MyPageMenuContainer>
        </MyPageContainer>
    )
};

export default MyPage;

