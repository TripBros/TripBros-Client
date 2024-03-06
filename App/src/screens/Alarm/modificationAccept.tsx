import React, { useState } from "react";
import { View, SafeAreaView, Text } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { ScheduleData } from "../../libs/Recoil/scheduleList";
import { formatDate } from "../Main/Search/Components/mainPost"

const ModificationAccept: React.FC = () => {
  const originalSchedule: ScheduleData = {
    scheduleId: 1,
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    country: '캐나다',
    city: '퀘백',
    image: null,
    memo: '',
  };

  const updatedSchedule: ScheduleData = {
    scheduleId: 1,
    startDate: '2024-02-03',
    endDate: '2024-02-07',
    country: '캐나다',
    city: '벤쿠버',
    image: null,
    memo: '',
  };

  const hasDateChanged = originalSchedule.startDate !== updatedSchedule.startDate || originalSchedule.endDate !== updatedSchedule.endDate;
  const hasLocationChanged = originalSchedule.country !== updatedSchedule.country || originalSchedule.city !== updatedSchedule.city;

  const formattedOriginalStartDate = formatDate(originalSchedule.startDate);
  const formattedOriginalEndDate = formatDate(originalSchedule.endDate);
  const formattedUpdatedStartDate = formatDate(updatedSchedule.startDate);
  const formattedUpdatedEndDate = formatDate(updatedSchedule.endDate);

  const ChangeMessage = () => {
    if (hasDateChanged && hasLocationChanged) {
      return (
        <Title>
          <Highlight>여행 도시, 여행 날짜</Highlight>가 변경되었어요
        </Title>
      );
    } else if (hasDateChanged) {
      return (
        <Title>
          <Highlight>여행 날짜</Highlight>가 변경되었어요
        </Title>
      );
    } else if (hasLocationChanged) {
      return (
        <Title>
          <Highlight>여행 도시</Highlight>가 변경되었어요
        </Title>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </Header>

        {ChangeMessage()}
        <NoticeText style={{ marginTop: 5 }}>승인 버튼을 누르면 일정이 자동으로 업데이트됩니다.</NoticeText>
        <NoticeText style={{ marginTop: 1 }}>관리자가 임의로 일정을 변경했다면, 거부 버튼을 눌러주세요.</NoticeText>

        {hasLocationChanged && <ModificationContainer>
          <ModificationTitle style={{color: "gray"}}>{originalSchedule.country} {originalSchedule.city} -></ModificationTitle>
          <ModificationContent>{updatedSchedule.country} {updatedSchedule.city}</ModificationContent>
        </ModificationContainer>}

        {hasDateChanged &&
          <ModificationContainer>
            <ModificationTitle style={{color: "gray"}}>{`${formattedOriginalStartDate} - ${formattedOriginalEndDate} ->`}</ModificationTitle>
            <ModificationContent>{`${formattedUpdatedStartDate} - ${formattedUpdatedEndDate}`}</ModificationContent>
          </ModificationContainer>}

      <FooterContainer>
        <ConfirmButtonContainer type="reject" onPress={() => {}}>
          <ButtonText type="reject">거부</ButtonText>
        </ConfirmButtonContainer>
        <ConfirmButtonContainer type="accept" onPress={() => {}}>
          <ButtonText type="accept">승인</ButtonText>
        </ConfirmButtonContainer>
      </FooterContainer>
    </SafeAreaView>
  );
};
export default ModificationAccept;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Title = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-left: 20px;
`;

const Highlight = styled.Text`
  color: #749BC2;
`;

const NoticeText = styled.Text`
    font-size: 12px;
    margin-left: 20px;
    color: gray;
`;

const ModificationContainer= styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ModificationTitle = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 30px;
`;

const ModificationContent = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-right: 20px;
    margin-top: 30px;
`;

const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 40px;
  margin-horizontal: 15px;
`;

const ConfirmButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.type === 'reject' ? 'white' : '#91C8E4'};
  border: 1px solid ${props => props.type === 'reject' ? 'gray' : '#91C8E4'};
  border-radius: 5px;
  flex: 1;
  margin-horizontal: 10px;
`

const ButtonText = styled.Text`
  color: ${props => props.type === 'reject' ? 'gray' : 'white'};
  padding: 15px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
`;