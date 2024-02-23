import React from "react";
import { View, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';

interface ModifiableScheduleData {
  startDate: string;
  endDate: string;
  country: string;
  city: string;
}
//장소도 가능

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

//날짜, 국가&도시, 장소
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <Text>닉네임님과의 약속 변경 사항</Text>
        <Text>날짜가 수정되었어요</Text>
      </View>
    </SafeAreaView>
  );
};

export default ModificationAccept;

const CalendarContainer = styled.View`
padding-horizontal: 20px;
`;