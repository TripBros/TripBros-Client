import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useSetRecoilState } from 'recoil';
import { scheduleListState } from '../../../../libs/Recoil/scheduleList'; 

interface ScheduleInfoProps {
  image: any;
  city: string;
  memo: string;
}

const MemoModal = ({ visible, onClose, onSave, initialMemo }) => {
  const [memo, setMemo] = useState(initialMemo);

  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <ModalContainer>
          <ModalView>
            <ScrollView>
              <MemoInput
                placeholder="메모를 입력하세요"
                value={memo}
                onChangeText={setMemo}
                multiline={true}/>
            </ScrollView>
            <ModalFooter>
              <ButtonContainer onPress={onClose}>
                <ButtonText>취소</ButtonText>
              </ButtonContainer>
              <View style={{width: 10}} /> 
              <ButtonContainer onPress={() => onSave(memo)}>
                <ButtonText style={{  color: '#54ACD9' }}>저장</ButtonText>
              </ButtonContainer>
            </ModalFooter>
          </ModalView>
        </ModalContainer>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const ScheduleInfo: React.FC<ScheduleInfoProps> = ({ image, city, memo: initialMemo }) => {
  const [memo, setMemo] = useState(initialMemo);
  const [modalVisible, setModalVisible] = useState(false);

  const setScheduleList = useSetRecoilState(scheduleListState);

  //initialMemo가 변경될 때 마다 내부 memo 상태를 업데이트
  useEffect(() => {
    setMemo(initialMemo);
  }, [initialMemo]);
  
  const handleSaveMemo = (newMemo) => {
    setMemo(newMemo);
    setModalVisible(false);
  };

  return (
  <ScheduleInfoContainer>
    <CityContainer>
      <SmallCityImage source={image} />
      <CityTitle>{`${city} 여행`}</CityTitle>
    </CityContainer>
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <MemoText memo={memo}>{memo || "간단한 메모를 추가해보세요!"}</MemoText>
    </TouchableOpacity>
    <MemoModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onSave={handleSaveMemo}
      initialMemo={memo}
    />
  </ScheduleInfoContainer>
  );
};
export default ScheduleInfo;

const ScheduleInfoContainer = styled.View`
    flex-direction: column;
    padding: 0px 15px;
`;

const CityContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SmallCityImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: 2px solid #CCCCCC;
    margin-right: 10px;
`;

const CityTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
`;

const MemoText = styled.Text`
    margin: 10px 5px;
    color: ${props => props.memo ? 'black' : '#A3A3A3'};
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
  background-color: rgba(0,0,0,0.5);
`;

const ModalView = styled.View`
  width: 80%;
  height: 60%;
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  justify-content: space-between;
`;

const MemoInput = styled.TextInput`
  width: '100%';
  padding: 10px; 
  backgroundColor: '#fff';
  margin-bottom: 20px;
`;

const ModalFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px; 
`;

const ButtonContainer = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 5px; 
  flex: 1;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 13px;
  font-weight: bold;
`;