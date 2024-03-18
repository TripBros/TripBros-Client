import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import { ScheduleData } from '../../../../libs/Recoil/scheduleList';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

interface CalendarComponentProps {
  isVisible: boolean;
  onClose: () => void;
  scheduleData: ScheduleData;
  onDayPress: (day: any) => void;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  displayedDates: string;
  onConfirm: () => void;
}

const SingleCalendar: React.FC<CalendarComponentProps> = ({ isVisible, onClose, scheduleData, onDayPress, selectedStartDate,
  selectedEndDate, displayedDates, onConfirm }) => {
    const today = new Date().toISOString().split('T')[0];

    // scheduleData.startDate가 오늘 날짜보다 이르면 today를 사용, 그렇지 않으면 scheduleData.startDate 사용
    const finalMinDate = new Date(scheduleData.startDate) < new Date(today) ? today : scheduleData.startDate;
    
    const generateMarkedDates = () => {
      let markedDates = {};
      const startDateStr = selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : null;
      const endDateStr = selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : null;
      const isSameDay = startDateStr === endDateStr;
    
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
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <ModalHeader>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </ModalHeader>
          <View style={{ paddingHorizontal: 25 }}>
            <Calendar
              theme={{
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textMonthFontWeight: 'bold',
                arrowColor: 'black',
              }}
              monthFormat={'yyyy년 M월'}
              markingType={'period'}
              minDate={finalMinDate}
              maxDate={scheduleData.endDate}
              markedDates={generateMarkedDates()}
              onDayPress={onDayPress}
            />
          </View>
          <View>
            <ConfirmButton onPress={onConfirm}>
                <ConfirmButtonText>{displayedDates !== '' ? displayedDates : '날짜를 선택해주세요'}</ConfirmButtonText>
              </ConfirmButton>
            </View>
          </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};
export default SingleCalendar;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
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