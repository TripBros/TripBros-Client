import React from 'react';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';

interface CalendarComponentProps {
  markedDates: { [date: string]: any };
  onDayPress: (day: any) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ markedDates, onDayPress }) => {
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
