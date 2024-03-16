import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import CalendarListModal from '../../../../components/Schedule/calendarListModal';
import DateSelectionBar from '../../../../components/Schedule/dateSelectionBar';
import CountryCityPicker from '../../../../components/Picker/countryCityPicker';

const TripFilter: React.FC = () => {
  const [isCalendarListVisible, setIsCalendarListVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [displayedDates, setDisplayedDates] = useState<string>(''); //사용자가 확인을 눌렀을 때 선택된 날짜를 표시하기 위함

  const toggleCalendar = () => {
    setIsCalendarListVisible(!isCalendarListVisible);
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
    setIsCalendarListVisible(false);
    if (selectedStartDate && selectedEndDate) {
      const startDateString = formatDate(selectedStartDate);
      const endDateString = formatDate(selectedEndDate);
      setDisplayedDates(`${startDateString} - ${endDateString}`);
    }
  };

  const formatDate = (date) => {
    let formattedDate = date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' });
    
    //0부터 일요일
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];
  
    formattedDate = formattedDate.replace(/\.$/, '');
  
    return `${formattedDate} (${weekday})`;
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CountryCityPicker />

      <DateSelectionBar
        displayedDates={displayedDates}
        onPress={toggleCalendar}
      />

      <CalendarListModal
        isCalendarListVisible={isCalendarListVisible}
        onClose={() => setIsCalendarListVisible(false)}
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