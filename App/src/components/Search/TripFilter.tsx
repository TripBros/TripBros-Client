import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { CalendarList } from 'react-native-calendars';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface DisplayDatesTextProps {
  displayed: boolean;
}

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
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(new Date(day.dateString));
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(new Date(day.dateString));
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

      <SearchBarContainer>
        <Feather name="calendar" size={24} color="black" />
        <TouchableOpacity onPress={toggleCalendar}>
          {displayedDates 
            ? <DisplayDatesText displayed={true}>{displayedDates}</DisplayDatesText>
            : <DisplayDatesText displayed={false}>날짜를 선택해주세요</DisplayDatesText>}
        </TouchableOpacity>
      </SearchBarContainer>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isCalendarVisible}
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <ModalHeader>
                <CloseButton onPress={() => setIsCalendarVisible(false)}>
                  <Feather name="x" size={24} color="black" />
                </CloseButton>
                <HeaderTitle>날짜 선택</HeaderTitle>
                <View style={{ width: 24 }}></View>
              </ModalHeader>
              <View style={{ flex: 1 }}>
                <CalendarList
                  theme={{
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textMonthFontWeight: 'bold',
                    todayTextColor: '#00adf5',
                  }}
                  pastScrollRange={0}
                  futureScrollRange={12}
                  current={selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : today}
                  minDate={today}
                  monthFormat={'yyyy년 M월'}
                  markingType={'period'}
                  markedDates={{
                    [selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '']: {
                      selected: true,
                      color: '#91C8E4',
                    },
                    [selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '']: {
                      selected: true,
                      color: '#91C8E4',
                    },
                  }}
                  onDayPress={handleDayPress}
                />
              </View>
              <View>
                <ConfirmButton onPress={handleConfirm}>
                  <ConfirmButtonText>확인</ConfirmButtonText>
                </ConfirmButton>
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
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

const DisplayDatesText = styled.Text<DisplayDatesTextProps>`
  flex: 1;
  height: 40px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  color: ${props => props.displayed ? 'black' : '#C4C4C4'};
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-right: 20px; 
`;

const HeaderTitle = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  background-color: blue;
  border-radius: 5px;
`;

const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;