import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { ScheduleData } from '../../../../libs/Recoil/scheduleList';

interface ScheduleElementProps {
  scheduleData: ScheduleData[];
  handleSelectSchedule: (schedule: ScheduleData) => void; 
}

const formatDate = (date) => {
  // 'ko-KR' 로케일을 사용하여 날짜를 가져옵니다. 이때 반환 형식은 '2.20. '와 같이 될 수 있습니다.
  let formattedDate = date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
  
  // 요일 배열(0부터 일요일)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];

  formattedDate = formattedDate.replace(/\.$/, '');

  return `${formattedDate} (${weekday})`;
};

const MyScheduleList: React.FC<ScheduleElementProps> = ({ scheduleData, handleSelectSchedule }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  
  const upcomingSchedules = scheduleData.filter(schedule => {
    const endDate = new Date(schedule.endDate);
    return endDate >= today;
  });

  return (
      <View>
        {upcomingSchedules.map((schedule, index) => {
          return (
            <TouchableOpacity onPress={() => handleSelectSchedule(schedule)}>
              <ScheduleListContainer key={schedule.scheduleId}>
              <CityImage source={schedule.image} />
              <ScheduleTextContainer>
                <CityTitle>{`${schedule.country} ${schedule.city}`}</CityTitle>
                <Text>{`${formatDate(new Date(schedule.startDate))} - ${formatDate(new Date(schedule.endDate))}`}</Text>
              </ScheduleTextContainer>
            </ScheduleListContainer>
            </TouchableOpacity>
          );
        })}
      </View>
  );
};
export default MyScheduleList;


const ScheduleListContainer = styled.View`
    flex-direction: row;
    margin: 10px 20px;
`;

const CityImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: 2px solid #CCCCCC;
`;

const ScheduleTextContainer = styled.View`
    margin-left: 15px;
    justify-content: center;
`;

const CityTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
`;

const ActionContainer = styled.View`
flex-direction: row;
justify-content: flex-end; 
align-items: center;
flex: 1; 
`;