import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const TripFilter: React.FC = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null); // 타입 명시
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null); // 타입 명시

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day: { dateString: string }) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(new Date(day.dateString));
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(new Date(day.dateString));
    }
  };

    return (
      <>
        <SearchBarContainer>
          <Feather name="search" size={24} color="black" />
          <SearchInput placeholder="검색어를 입력하세요"/>

          <CalendarButton onPress={toggleCalendar}>
            <Feather name="calendar" size={24} color="black" />
          </CalendarButton>
        </SearchBarContainer>
      {isCalendarVisible && (
        <CalendarList
          current={selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : undefined}
          minDate={new Date().toISOString().split('T')[0]} // 현재 날짜 이전 날짜 선택 방지
          markingType={'period'}
          markedDates={{
            [selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '']: {
              selected: true,
              color: 'blue',
            },
            [selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '']: {
              selected: true,
              color: 'blue',
            },
          }}
          onDayPress={handleDayPress}
        />
      )}
      </>
    );
};
export default TripFilter;

const CalendarButton = styled.TouchableOpacity``;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  padding-horizontal: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  height: 40px;
`;

const SearchButton = styled.TouchableOpacity``;
