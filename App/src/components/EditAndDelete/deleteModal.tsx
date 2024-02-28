import React from "react";
import { Text, Modal, View } from 'react-native';
import styled from "styled-components/native";
import { ModalContainer, ModalFooter, ButtonContainer, ButtonText } from "../../screens/Main/Plan/Components/scheduleInfo";

const DeleteModal = ({ isVisible, onRequestClose, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onRequestClose}>
      <ModalContainer>
        <ModalView>
          <ModalText>해당 일정을 삭제하시겠습니까?</ModalText>
            <ModalFooter>
              <ButtonContainer onPress={onCancel}>
                <ButtonText>취소</ButtonText>
              </ButtonContainer>
              <View style={{width: 10}} />
              <ButtonContainer onPress={onConfirm}>
                <ButtonText style={{  color: '#54ACD9' }}>확인</ButtonText>
              </ButtonContainer>
            </ModalFooter>
          </ModalView>
      </ModalContainer>
    </Modal>
  );
};
export default DeleteModal;

const ModalView = styled.View`
  width: 70%;
  height: 20%;
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  justify-content: space-between;
`;

const ModalText = styled.Text`
  text-align: center;
  padding: 13px; 
`;