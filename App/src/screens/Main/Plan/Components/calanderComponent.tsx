import React from 'react';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import { ScheduleData, PromiseData } from '../../../../libs/Recoil/scheduleList';

interface CalendarComponentProps {
  scheduleData: ScheduleData[];
  promiseData: PromiseData[];
  onDayPress: (day: any) => void;
}

//캘린더에 들어가는 markedDates 동적으로 생성
const generateMarkedDates = (scheduleData, promiseData) => {
  const markedDates: { [date: string]: any } = {};
  
  //배열 순회하면서 startDate랑 endDate만 가져다 씀
  scheduleData.forEach(schedule => {
      const startDate = new Date(schedule.startDate); //Date 객체
      const endDate = new Date(schedule.endDate);

      //시작 날짜와 종료 날짜가 같은지 확인
      const isSameDay = startDate.toISOString().split('T')[0] === endDate.toISOString().split('T')[0];
  
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          const dateStr = date.toISOString().split('T')[0];

          if (isSameDay) {
            markedDates[dateStr] = { selected: true, startingDay: true, endingDay: true, color: '#91C8E4', textColor: 'white' };
            break; // 더 이상의 루프 필요 X
          } else if (dateStr === schedule.startDate) {
            markedDates[dateStr] = { startingDay: true, color: '#91C8E4', textColor: 'white' };
          } else if (dateStr === schedule.endDate) {
            markedDates[dateStr] = { endingDay: true, color: '#91C8E4', textColor: 'white' };
          } else {
            markedDates[dateStr] = { color: '#91C8E4', textColor: 'white' };
          }
        }
      });

  promiseData.forEach(promise => {
    const promiseStartDate = new Date(promise.startDate);
    const promiseEndDate = new Date(promise.endDate);

    for(let date = new Date(promiseStartDate); date <= promiseEndDate; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split('T')[0];

      if (markedDates[dateStr]) {
        markedDates[dateStr] = { ...markedDates[dateStr], marked: true, dotColor: 'black' }; // 기존 markedDates 유지하며 dot 추가
      } else {
        markedDates[dateStr] = { marked: true, dotColor: 'black' }; //새로운 날짜에 대한 설정
      }
    }
  });
  
  return markedDates;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ scheduleData, promiseData, onDayPress }) => {

  const markedDates = generateMarkedDates(scheduleData,promiseData);
  
  return (
    <CalendarContainer>
      <Calendar
        theme={{
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          arrowColor: 'black',
          todayTextColor: '#00adf5',
        }}
        monthFormat={'yyyy년 M월'}
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={onDayPress}
      />
    </CalendarContainer>
  );
};
export default CalendarComponent;

const CalendarContainer = styled.View`
  padding: 20px;
`;
