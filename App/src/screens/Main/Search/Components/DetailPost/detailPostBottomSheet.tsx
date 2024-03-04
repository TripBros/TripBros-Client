import React, { useEffect, useRef, useState } from 'react';
import { Modal, Animated, TouchableWithoutFeedback, Dimensions, PanResponder, Button } from 'react-native';
import styled from 'styled-components/native';
import DeleteModal from '../../../../../components/EditAndDelete/deleteModal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../navigators/RootNavigator';
import { PostData } from '../../index';

interface BottomSheetProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  isAuthor: boolean;
  postData: PostData;
}

const DetailPostBottomSheet: React.FC<BottomSheetProps> = ({ modalVisible, setModalVisible, isAuthor, postData }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // 삭제 모달을 열기 전에 BottomSheet 모달을 닫는 함수
  const openDeleteModal = () => {
    setModalVisible(false);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    // 삭제 로직 처리
    console.log("게시글 삭제 처리");
    setDeleteModalVisible(false);
  };

  const openReportScreen = () => {
    setModalVisible(false);
    navigation.navigate('ReportPost')
  };

  const openEditScreen = () => {
    setModalVisible(false);
    navigation.navigate('EditPost', { postData });
  };

  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: (event, gestureState) => {
      panY.setValue(gestureState.dy);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dy > 0 && gestureState.vy > 1.5) {
        closeModal();
      } else {
        resetBottomSheet.start();
      }
    }
  })).current;

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <>
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <Overlay>
        <TouchableWithoutFeedback onPress={closeModal}>
          <Background />
        </TouchableWithoutFeedback>
        <AnimatedContainer
          style={{ transform: [{ translateY }] }}
          {...panResponders.panHandlers}
        >
        {isAuthor ? (
          <>
            <TextButton onPress={openEditScreen}>
              <ButtonText>수정하기</ButtonText>
            </TextButton>
            <TextButton onPress={openDeleteModal}>
              <ButtonText>삭제하기</ButtonText>
            </TextButton>
          </>
        ) : (
          <TextButton onPress={openReportScreen}>
            <ButtonText>신고하기</ButtonText>
          </TextButton>
        )}
        </AnimatedContainer>
      </Overlay>
    </Modal>
    <DeleteModal
        isVisible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        message="해당 게시글을 삭제하시겠습니까?"
      />
    </>
  );
};
export default DetailPostBottomSheet;

const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Background = styled.View`
  flex: 1;
`;

const AnimatedContainer = styled(Animated.View)`
  height: 200px;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TextButton = styled.TouchableOpacity`
padding: 10px 0;
margin: 8px 0;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
`;