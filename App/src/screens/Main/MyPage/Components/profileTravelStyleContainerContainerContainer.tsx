import React, { useState,useEffect } from 'react';
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
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../libs/Recoil/authState';

interface ProfileProps {
    userLoginState: boolean;
}

const ProfileTravelStyleContainerContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const user = useRecoilValue(userState);
    // 로직 추가햐아함
    const [travelStyleArray,useTravelStyleArray] = useState({
        leisurely: '여유로운 일정',
        planner: '계획적인',
        adventurous: '모험적인',
        vehicle_travel: '차량 선호',
        photo_preference: '사진 선호',
    });


    useEffect(() => {
        console.log(user);
    });

    if (!userLoginState) {
        return (
            <ProfileTravelStyleContainerContainer/>
        );
    }
    return (
        <ProfileTravelStyleContainerContainer>
                <ProfileTravelStyleContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>{travelStyleArray.leisurely}</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>{travelStyleArray.planner}</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>{travelStyleArray.adventurous}</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                </ProfileTravelStyleContainer>
                <ProfileTravelStyleContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>{travelStyleArray.vehicle_travel}</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                    <ProfileTravelStyleTextContainer>
                        <ProfileTravelStyleText>{travelStyleArray.photo_preference}</ProfileTravelStyleText>
                    </ProfileTravelStyleTextContainer>
                </ProfileTravelStyleContainer>
            </ProfileTravelStyleContainerContainer>
    );
};

export default ProfileTravelStyleContainerContainerContainer;
