import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ReportPost:React.FC = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color="black" />
          </TouchableOpacity>
        </Header>
        <Title>신고 사유를 입력해주세요.</Title>
        <PlanMemoInput
            multiline={true}
            numberOfLines={4}
            textAlignVertical='top'
            placeholder="신고 사유를 입력해주세요. 자세하게 작성해주시면 신고 처리에 큰 도움이 됩니다."
            value={content}
            onChangeText={setContent}/>
        <SubmitButton onPress={()=>{}}>
          <SubmitButtonText>신고하기</SubmitButtonText>
        </SubmitButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default ReportPost;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding: 10px 25px;
`;

const PlanMemoInput = styled.TextInput`
    height: 400px;
    border: 1px solid #000;
    padding: 13px;
    borderColor: gray;
    borderWidth: 1px;
    border-radius: 10px;
    margin: 5px 25px;
    `;

const SubmitButton = styled.TouchableOpacity`
    background-color: #91C8E4;
    padding: 18px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px 25px;
`;

const SubmitButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;