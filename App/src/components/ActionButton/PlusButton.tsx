import React from "react";
import styled from 'styled-components/native';
import ActionButton from 'react-native-action-button';
import { View ,Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { useRecoilValue } from "recoil";
import { userLoginState } from '../../libs/Recoil/authState';

const PlusButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loginState = useRecoilValue(userLoginState);

  const handleCLickCreatePlan = () => {
    if (!loginState) {
      Alert.alert('로그인 후 이용해주세요');
      return;
    }
    navigation.navigate('CreatePlan');
  }

  return(
    <View style={{
      flex:1,
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 90,
      height: 90,
      zIndex: 10,
      alignItems: 'center',
      alignContent: 'center',
    }}>
      <ActionButton buttonColor="#91C8E4" size={70}>
        <ActionButton.Item buttonColor='#749BC2' size={70} onPress={() => {navigation.navigate('CreatePlan')}}>
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