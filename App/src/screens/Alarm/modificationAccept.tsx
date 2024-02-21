import React from "react";
import { View, SafeAreaView } from "react-native";
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components/native';

interface ModifiableScheduleData {
  startDate: string;
  endDate: string;
  country: string;
  city: string;
}

const ModificationAccept: React.FC = () => {
  // 임시로 일정 데이터 정의
  const originalSchedule: ModifiableScheduleData = {
    startDate: '2023-03-01',
    endDate: '2023-03-05',
    country: 'Country A',
    city: 'City A',
  };

  const updatedSchedule: ModifiableScheduleData = {
    startDate: '2023-03-03',
    endDate: '2023-03-07',
    country: 'Country A',
    city: 'City A',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}>
      </View>
    </SafeAreaView>
  );
};

export default ModificationAccept;

const CalendarContainer = styled.View`
padding-horizontal: 20px;
`;