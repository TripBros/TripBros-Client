import React from "react";
import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';

const PlusButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return(
    <View style={{
      flex:1,
      position: 'absolute',
      right: 0,
      bottom: 80,
      width: 90,
      height: 90,
      zIndex: 10,
      alignItems: 'center',
      alignContent: 'center',
    }}>
      <ActionButton buttonColor="#91C8E4" size={70}>
        <ActionButton.Item buttonColor='#749BC2' size={70} onPress={() => {}}>
          <ButtonText>일정</ButtonText>
          <ButtonText>등록</ButtonText>
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#749BC2' size={70} onPress={() => {navigation.navigate('PostRegister')}}>
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