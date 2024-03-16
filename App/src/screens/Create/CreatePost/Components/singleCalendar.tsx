import React, { useState } from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';
import { ScheduleData } from '../../../../libs/Recoil/scheduleList';

interface CalendarComponentProps {
  isVisible: boolean;
  onClose: () => void;
  scheduleData: ScheduleData;
  onDayPress: (day: any) => void;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
}

const SingleCalendar: React.FC<CalendarComponentProps> = ({ isVisible, onClose, scheduleData, onDayPress, selectedStartDate,
  selectedEndDate }) => {
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
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 35, paddingVertical: 25, alignItems: 'center'}}>
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
            markedDates={generateMarkedDates()}
            onDayPress={onDayPress}
          />
          <TouchableOpacity onPress={onClose}>
            <Text>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default SingleCalendar;
