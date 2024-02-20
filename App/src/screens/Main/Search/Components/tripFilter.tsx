import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import CalendarListModal from '../../../../components/Schedule/calanderListModal';
import DateSelectionBar from '../../../../components/Schedule/dateSelectionBar';

const TripFilter: React.FC = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [displayedDates, setDisplayedDates] = useState<string>(''); //사용자가 확인을 눌렀을 때 선택된 날짜를 표시하기 위함

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  // 1. 시작 날짜가 선택되지 않았거나 or 시작 및 종료 날짜가 모두 선택된 경우
  //    => 클릭한 날짜를 시작 날짜로 설정하고, 종료 날짜를 null로 재설정
  // 2. 시작 날짜가 이미 선택되어 있고, 종료 날짜가 선택되지 않은 경우, 클릭한 날짜를 종료 날짜로
  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString);

    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null);
      // 시작 날짜를 선택하고, 확인 버튼의 텍스트를 업데이트
      setDisplayedDates(formatDate(selectedDate));
    } else {
      // 종료 날짜를 설정하고, 시작 및 종료 날짜를 포함한 범위로 텍스트를 업데이트
      setSelectedEndDate(selectedDate);
      const startDateString = formatDate(selectedStartDate);
      const endDateString = formatDate(selectedDate);
      setDisplayedDates(`${startDateString} ~ ${endDateString}`);
    }
  };

  const handleConfirm = () => {
    setIsCalendarVisible(false);
    if (selectedStartDate && selectedEndDate) {
      const startDateString = formatDate(selectedStartDate);
      const endDateString = formatDate(selectedEndDate);
      setDisplayedDates(`${startDateString} - ${endDateString}`);
    }
  };

  const formatDate = (date: Date) => {
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  };

  //YYYY-MM-DD 형식으로 변환
  const today = new Date().toISOString().split('T')[0];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SearchBarContainer>
        <Feather name="search" size={24} color="black" />
        <SearchInput placeholder="도시를 입력하세요"/>
      </SearchBarContainer>

      <DateSelectionBar
        displayedDates={displayedDates}
        onPress={toggleCalendar}
      />

      <CalendarListModal
        isCalendarVisible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onDayPress={handleDayPress}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        displayedDates={displayedDates}
        onConfirm={handleConfirm}
      />
    </View>
  );
};
export default TripFilter;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: 30px;
  padding-horizontal: 20px;
  padding-vertical: 5px;
  margin: 10px;
  width: 80%;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 20px;
  height: 40px;
`;