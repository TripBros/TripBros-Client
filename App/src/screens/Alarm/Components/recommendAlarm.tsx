import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { AlarmContainer } from "./reminderAlarm";
import { AlarmTitleContainer } from "./reminderAlarm";
import { AlarmTitle } from "./reminderAlarm";
import { AlarmContent } from "./reminderAlarm";

const RecommendAlarm: React.FC = () => {
  return(
    <TouchableOpacity>
      <AlarmContainer>
        <AlarmTitleContainer>
          <FontAwesome5 name="heart" size={24} color="#D35151" />
          <AlarmTitle>관심 게시글 알림</AlarmTitle>
        </AlarmTitleContainer>
        <AlarmContent>여행 일정이 겹치고, 여행 스타일이 비슷한 게시글이 업로드되었어요!</AlarmContent>
        <PostTitle>해당 게시글 제목</PostTitle>
      </AlarmContainer>
      <DivisionLine/>
    </TouchableOpacity>
  );
} 
export default RecommendAlarm;

const PostTitle = styled.Text`
    lineHeight: 20;
    font-size: 13px;
    font-weight: bold;
    color: grey;
`;

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 20px;
    margin-bottom: 20px;
`;