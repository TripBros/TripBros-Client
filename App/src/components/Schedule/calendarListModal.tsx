import React from 'react';
import { Modal, View, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CalendarList } from 'react-native-calendars';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

interface calendarListModalProps {
  isCalendarListVisible: boolean;
  onClose: () => void;
  onDayPress,
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  displayedDates: string;
  onConfirm: () => void;
}

const CalendarListModal: React.FC<calendarListModalProps> = ({
  isCalendarListVisible,
  onClose,
  onDayPress,
  selectedStartDate,
  selectedEndDate,
  displayedDates,
  onConfirm,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const generateMarkedDates = () => {
    let markedDates = {};
    // selectedStartDate와 selectedEndDate가 null인 경우를 처리
    const startDateStr = selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : null;
    const endDateStr = selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : null;
    const isSameDay = startDateStr && endDateStr && startDateStr === endDateStr;
  
    if (startDateStr) {
      if (isSameDay) {
        // 시작 날짜와 종료 날짜가 같은 경우
        markedDates[startDateStr] = { selected: true, startingDay: true, endingDay: true, color: '#91C8E4', textColor: 'white' };
      } else {
        // 시작 날짜만 선택되었거나, 시작 날짜와 종료 날짜가 다른 경우
        markedDates[startDateStr] = { startingDay: true, color: '#91C8E4', textColor: 'white' };
        
        if (selectedStartDate && selectedEndDate) {
          let date = new Date(selectedStartDate);
          while (date <= selectedEndDate) {
            const dateStr = date.toISOString().split('T')[0];
    
            if (endDateStr && dateStr === endDateStr) {
              markedDates[dateStr] = { endingDay: true, color: '#91C8E4', textColor: 'white' };
            } else if (dateStr !== startDateStr) {
              markedDates[dateStr] = { color: '#91C8E4', textColor: 'white' };
            }
    
            date.setDate(date.getDate() + 1); // 다음 날짜로
          }
        }
      }
    }
    
    return markedDates;
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isCalendarListVisible}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ModalHeader>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
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
                  markedDates={generateMarkedDates()}
                  onDayPress={onDayPress}
                />
            </View>
            <View>
              <ConfirmButton onPress={onConfirm}>
                <ConfirmButtonText>{displayedDates !== '' ? displayedDates : '날짜를 선택해주세요'}</ConfirmButtonText>
              </ConfirmButton>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
export default CalendarListModal;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 15px;
  background-color: #91C8E4;
  border-radius: 5px;
`;

const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;