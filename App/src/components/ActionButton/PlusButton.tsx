import React from "react";
import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import { View, Text } from 'react-native';

const PlusButton: React.FC = () => {
  return(
    <View style={{flex:1}}>
      <ActionButton buttonColor="#91C8E4" size={70}>
        <ActionButton.Item buttonColor='#749BC2' size={70} onPress={() => {}}>
          <ButtonText>일정</ButtonText>
          <ButtonText>등록</ButtonText>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#749BC2' size={70} onPress={() => {}}>
          <ButtonText>게시글</ButtonText>
          <ButtonText>작성</ButtonText>
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}
export default PlusButton;

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 13px;
  color: white;
  text-align: center;
  padding: 2px;
`