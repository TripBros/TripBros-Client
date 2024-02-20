import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ScheduleData {
  startDate: string;
  endDate: string;
  city: string;
  image: any;
  memo: string;
}

interface ScheduleElementProps {
  scheduleData: ScheduleData[];
  isDetailed?: boolean;
}

const ScheduleList: React.FC<ScheduleElementProps & { onSelectSchedule?: (schedule: ScheduleData) => void }> = ({ scheduleData, isDetailed = false, onSelectSchedule }) => {
  const formatDate = (date: Date) => {
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  };

  const calculateDDay = (startDateString: string): string => {
    // UTC를 사용하면 디데이 계산할 때 시간대 영향을 배제할 수 있음
    const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
  
    const startDate = new Date(Date.UTC(new Date(startDateString).getFullYear(), new Date(startDateString).getMonth(), new Date(startDateString).getDate()));
  
    const difference = startDate.getTime() - today.getTime();
  
    const dDay = Math.ceil(difference / (1000 * 60 * 60 * 24));
    
    return `D-${dDay}`;
  };

  return (
    <>
      {scheduleData.map((schedule, index) => {
        const dDay = calculateDDay(schedule.startDate);

        return (
          <TouchableOpacity key={index} onPress={() => onSelectSchedule?.(schedule)}>
            <ScheduleListContainer key={index}>
            <CityImage source={schedule.image} />
            <ScheduleTextContainer>
              { isDetailed && <CityTitle>{`${schedule.city} 🗓${dDay}`}</CityTitle>}
              { !isDetailed && <CityTitle>{`${schedule.city}`}</CityTitle>}
              <Text>{`${formatDate(new Date(schedule.startDate))} - ${formatDate(new Date(schedule.endDate))}`}</Text>
            </ScheduleTextContainer>
          </ScheduleListContainer>
          </TouchableOpacity>
        );
      })}
    </>
  );
};
export default ScheduleList;

const ScheduleListContainer = styled.View`
    flex-direction: row;
    padding: 10px 15px;
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