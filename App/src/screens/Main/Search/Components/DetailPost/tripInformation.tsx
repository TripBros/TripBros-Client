import React from "react";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

interface TripInformationProps {
  postData: {
    country: string;
    city: string;
    nowHeadCount: number;
    requiredHeadCount: number;
    preferAgeRange: string | string[]; // 단일 문자열 또는 문자열 배열
    preferSex: string;
  };
  formattedDateRange: string;
}

const TripInformation: React.FC<TripInformationProps> = ({ postData, formattedDateRange }) => {
    
    const formattedPreferAgeRange = Array.isArray(postData.preferAgeRange)
    ? postData.preferAgeRange.join(", ")
    : postData.preferAgeRange;

  return(
    <>
        <RoundedBackground>
          <RowContainer>
            <SimpleLineIcons name="plane" size={22} color="black" />
            <DetailText>{`${postData.country} ${postData.city}`}</DetailText>
          </RowContainer>
          <RowContainer>
            <Feather name="calendar" size={22} color="black" />
            <DetailText>{formattedDateRange}</DetailText>
          </RowContainer>
          <RowContainer>
            <Octicons name="person" size={22} color="black" />
            <DetailText>{`${postData.nowHeadCount}/${postData.requiredHeadCount}명`}</DetailText>
          </RowContainer>
          <RowContainer>
            <Fontisto name="person" size={22} color="black" />
            <DetailText>{`${formattedPreferAgeRange.trim()} 선호`}</DetailText>
          </RowContainer>
          <RowContainer>
            <Fontisto name="person" size={22} color="black" />
            <DetailText>{`${postData.preferSex} 선호`}</DetailText>
          </RowContainer>
        </RoundedBackground>    
    </>
  );
}
export default TripInformation;

const RoundedBackground = styled.View`
  background-color: #F1F1F1;
  border-radius: 10px;
  padding: 10px 15px;
  margin-top: 10px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0px;
`;

const DetailText = styled.Text`
  font-size: 14px;
  margin-left: 10px;
`;