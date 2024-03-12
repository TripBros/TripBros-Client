import React from 'react';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import { ScheduleData } from '../../../../libs/Recoil/scheduleList';

interface CalendarComponentProps {
  scheduleData: ScheduleData;
  onDayPress: (day: any) => void;
}

const SingleCalendar: React.FC<CalendarComponentProps> = ({ scheduleData, onDayPress }) => {
  return (
    <CalendarContainer>
      <Calendar
        theme={{
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          arrowColor: 'black',
        }}
        monthFormat={'yyyy년 M월'}
        markingType={'period'}
        minDate={scheduleData.startDate}
        maxDate={scheduleData.endDate}
        onDayPress={onDayPress}
      />
    </CalendarContainer>
  );
};
export default SingleCalendar;

const CalendarContainer = styled.View`
  margin-horizontal: 25px;
`;
