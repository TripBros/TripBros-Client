import React, { useState,useEffect } from 'react';
import {
    ProfileTravelStyleContainerContainer,
    ProfileTravelStyleContainer,
    ProfileTravelStyleTextContainer,
    ProfileTravelStyleText,
} from '../styles';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';

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

// 마이페이지에서 뿌려질 여행스타일 상태
interface Profile {
    leisurely : string;
    planner : string;
    adventurous : string;
    vehicle_travel : string;
    photo_preference : string;
}

const ProfileTravelStyleContainerContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const token = useRecoilValue(userTokenState);
    const [travelStyleArray,useTravelStyleArray] = useState<Profile>({
        leisurely: '여유로운 일정',
        planner: '계획적인',
        adventurous: '모험적인',
        vehicle_travel: '차량 선호',
        photo_preference: '사진 선호',
    });

    // 유저 데이터 호출 
    async function getTravelStyles(accessToken: string): Promise<UserProfile> {
        const response = await axios.post<UserProfile>('/api/user/profile', {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        });
        return response.data;
    }   

    if (!userLoginState) {
        return (
            <ProfileTravelStyleContainerContainer/>
        );
    }
    else {
        useEffect(() => {
            getTravelStyles(token.accessToken).then((response) => {
                useTravelStyleArray({
                    leisurely: response.leisurely_flag ? '여유로운 일정' : '빡빡한 일정',
                    planner: response.planner_flag ? '계획적인' : '즉흥적인',
                    adventurous: response.adventurous_flag ? '모험적인' : '안전한',
                    vehicle_travel: response.vehicle_travel_flag ? '차량 선호' : '대중교통 선호',
                    photo_preference: response.photo_preference_flag ? '사진 선호' : '사진 비선호',
                })})},[]);

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
}

export default ProfileTravelStyleContainerContainerContainer;
