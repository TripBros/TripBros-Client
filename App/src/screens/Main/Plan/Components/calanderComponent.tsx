import React from 'react';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import { ScheduleData } from '../../../../libs/Recoil/scheduleList';

interface CalendarComponentProps {
  scheduleData: ScheduleData[];
  onDayPress: (day: any) => void;
}

//캘린더에 들어가는 markedDates 동적으로 생성
const generateMarkedDates = (scheduleData: ScheduleData[]) => {
  const markedDates: { [date: string]: any } = {};
  
  //배열 순회하면서 startDate랑 endDate만 가져다 씀
  scheduleData.forEach(schedule => {
      const startDate = new Date(schedule.startDate); //Date 객체
      const endDate = new Date(schedule.endDate);
  
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          const dateStr = date.toISOString().split('T')[0];

          if (dateStr === schedule.startDate) {
              markedDates[dateStr] = { startingDay: true, color: '#91C8E4', textColor: 'white' };
          } else if (dateStr === schedule.endDate) {
              markedDates[dateStr] = { endingDay: true, color: '#91C8E4', textColor: 'white' };
          } else {
              markedDates[dateStr] = { color: '#AACDDF', textColor: 'white' };
          }
      }
  });
  
  return markedDates;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ scheduleData, onDayPress }) => {

  const markedDates = generateMarkedDates(scheduleData);
  
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
  padding-horizontal: 20px;
`;
