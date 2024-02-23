import React from "react";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';
import { AlarmContainer, AlarmTitleContainer, AlarmTitle, AlarmContent } from "./reminderAlarm";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const ModificationAlarm: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return(
    <TouchableOpacity onPress={() => navigation.navigate('ModificationAccept')}>
      <AlarmContainer>
        <AlarmTitleContainer>
          <AntDesign name="notification" size={27} color="#D35151" />
          <AlarmTitle>일정 수정 수락 요청</AlarmTitle>
        </AlarmTitleContainer>
        <AlarmContent>관리자가 일정을 수정했어요! 협의된 사항이라면 수정 사항을 수락해주세요. 수정된 일정으로 동기화됩니다.</AlarmContent>
      </AlarmContainer>
      <DivisionLine/>
    </TouchableOpacity>
  );
} 
export default ModificationAlarm;

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 20px;
    margin-bottom: 20px;
`;