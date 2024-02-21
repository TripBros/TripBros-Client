import React from "react";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

const ReminderAlarm: React.FC = () => {
  return(
    <TouchableOpacity>
      <AlarmContainer>
        <AlarmTitleContainer>
          <AntDesign name="warning" size={27} color="#D35151" />
          <AlarmTitle>일정 수정 수락 요청 재알림</AlarmTitle>
        </AlarmTitleContainer>
        <AlarmContent>관리자가 일정을 수정했어요! 협의된 사항이라면 수정 사항을 수락해주세요. 수정된 일정으로 동기화됩니다.</AlarmContent>
      </AlarmContainer>
      <DivisionLine/>
    </TouchableOpacity>
  );
} 
export default ReminderAlarm;

export const AlarmContainer = styled.View`
    margin-horizontal: 30px;
`;

export const AlarmTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
`;

export const AlarmTitle = styled.Text`
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
    color: #D35151;
`;

export const AlarmContent = styled.Text`
    lineHeight: 20;
    font-size: 13px;
`;

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 20px;
    margin-bottom: 20px;
`;