import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const TripFilter: React.FC = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [displayedDates, setDisplayedDates] = useState<string>(''); //선택된 날짜를 표시하기 위함

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // 1. 시작 날짜가 선택되지 않았거나 or 시작 및 종료 날짜가 모두 선택된 경우
  //    => 클릭한 날짜를 시작 날짜로 설정하고, 종료 날짜를 null로 재설정
  // 2. 시작 날짜가 이미 선택되어 있고, 종료 날짜가 선택되지 않은 경우, 클릭한 날짜를 종료 날짜로
  const handleDayPress = (day: { dateString: string }) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(new Date(day.dateString));
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(new Date(day.dateString));
    }
  };

  const handleConfirm = () => {
    setIsCalendarVisible(false);
    setDisplayedDates(`시작: ${selectedStartDate?.toISOString().split('T')[0]}, 종료: ${selectedEndDate?.toISOString().split('T')[0]}`);
  };

  //YYYY-MM-DD 형식으로 변환
  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <SearchBarContainer>
        <Feather name="search" size={24} color="black" />
        <SearchInput placeholder="검색어를 입력하세요"/>
      </SearchBarContainer>

      <SearchBarContainer>
        <CalendarButton onPress={toggleCalendar}>
          <Feather name="calendar" size={24} color="black" />
          {displayedDates && <DisplayDatesText>{displayedDates}</DisplayDatesText>}
        </CalendarButton>
      </SearchBarContainer>

      {isCalendarVisible && (
        <>
          <Calendar
            current={selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : undefined}
            minDate={today}
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
          <ConfirmButton onPress={handleConfirm}>
            <ConfirmButtonText>확인</ConfirmButtonText>
          </ConfirmButton>
        </>
      )}
    </>
  );
};
export default TripFilter;

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

const CalendarButton = styled.TouchableOpacity``;

const ConfirmButton = styled.TouchableOpacity``;
const ConfirmButtonText = styled.Text``;
const DisplayDatesText = styled.Text``;