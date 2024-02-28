import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { ScheduleData } from '../../libs/Recoil/scheduleList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

interface ScheduleElementProps {
  scheduleData: ScheduleData[];
  isDetailed?: boolean;
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

const calculateDDay = (startDateString: string, endDateString: string): string => {
  // UTC를 사용하면 디데이 계산할 때 시간대 영향을 배제할 수 있음
  const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

  const startDate = new Date(Date.UTC(new Date(startDateString).getFullYear(), new Date(startDateString).getMonth(), new Date(startDateString).getDate()));
  const endDate = new Date(Date.UTC(new Date(endDateString).getFullYear(), new Date(endDateString).getMonth(), new Date(endDateString).getDate()));

  const differenceStart = startDate.getTime() - today.getTime();

  //시작 날짜 이전
  if (differenceStart > 0) {
    const dDay = Math.ceil(differenceStart / (1000 * 60 * 60 * 24));
    return `🗓D-${dDay}`;
  }
  return '';
};

const ScheduleList: React.FC<ScheduleElementProps & { onSelectSchedule?: (schedule: ScheduleData) => void, onDeleteSchedule?: (index: number) => void }> = ({ scheduleData, isDetailed = false, onDeleteSchedule }) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  const toggleActionVisibility = (index: number) => {
    setVisibleIndex(visibleIndex === index ? null : index);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setVisibleIndex(null)}>
      <View onStartShouldSetResponder={() => true}>
        {scheduleData.map((schedule, index) => {
          const dDay = calculateDDay(schedule.startDate, schedule.endDate);

          return (
            <ScheduleListContainer key={schedule.scheduleId}>
              <CityImage source={schedule.image} />
              <ScheduleTextContainer>
                {isDetailed && <CityTitle>{`${schedule.city} 여행 ${dDay}`}</CityTitle>}
                {!isDetailed && <CityTitle>{`${schedule.country} ${schedule.city}`}</CityTitle>}
                <Text>{`${formatDate(new Date(schedule.startDate))} - ${formatDate(new Date(schedule.endDate))}`}</Text>
              </ScheduleTextContainer>
              <ActionContainer>
                {visibleIndex === index ? (
                  <>
                    <TouchableOpacity onPress={() =>{}} 
                                      style={{ marginHorizontal: 5 }}>
                      <AntDesign name="edit" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDeleteSchedule && onDeleteSchedule(schedule.scheduleId)}>
                      <Ionicons name="trash-outline" size={20} color="black" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity onPress={() => toggleActionVisibility(index)}>
                    <MaterialCommunityIcons name="dots-vertical" size={22} color="black" />
                  </TouchableOpacity>
                )}
              </ActionContainer>
            </ScheduleListContainer>
          );
        })}
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ScheduleList;


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