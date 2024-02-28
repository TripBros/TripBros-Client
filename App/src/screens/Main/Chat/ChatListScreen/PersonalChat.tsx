import React, { useEffect,useState,useRef,useMemo,useCallback ,} from 'react';
import { View, Text, TouchableOpacity,StyleSheet, Modal  } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
    ChatContainer,
    BottomSheetControllerBox,
    BottomSheetContrller,
    BottomSheetControllerText,
    SelectConfirmedChatBox,
    SelectConfirmedChat,
    SelectConfirmedChatText,
    ChattingLogBox,
    ChattingLogImage,
    ChattingContentBox,
    ChattingNameandAgeBox,
    ChattingLogName,
    ChattingLogAge,
    ChattingLogTimeandTextBox,
    ChattingLogText,
    ChattingLogTime
} from './styles';
import { useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigators/RootNavigator';
import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SERVER_BASE_URL } from '../../../../utils/constants';
//icon
import { AntDesign } from '@expo/vector-icons';

interface Chat {
    profileImage: string;
    name: string;
    age: string;
    time: string;
    text: string;
    roomId : string;
}
const PersonalChat = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const tokenState = useRecoilValue(userTokenState);
    const [confirmedButtonState,setConfrimButtonState] = useState<boolean>(false);

    //bottom sheet
    const [kindOfChat, setKindOfChat] = useState<string>('전체 채팅');
    const [isVisible, setIsVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    // Bottom Sheet 토글 함수
    const toggleBottomSheet = () => {
        // 현재 상태에 따라 Bottom Sheet를 열거나 닫습니다.
        if (isVisible) {
            bottomSheetRef.current?.close(); // Bottom Sheet 닫기
        } else {
            bottomSheetRef.current?.snapToIndex(0); // Bottom Sheet 열기 (첫 번째 snap point로 이동)
        }
        setIsVisible(!isVisible);
    };

    // Bottom Sheet가 닫힐 때 호출될 콜백
    const handleSheetChanges = useCallback((index: number) => {
        // index가 -1이면 Bottom Sheet가 완전히 닫힌 상태입니다.
        if (index === -1) {
            setIsVisible(false);
        }
    }, []);



    //더미 데이터
    const [chats, setChats] = useState<Chat[]>([
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '1'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '2'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '3'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '4'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '5'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '6'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '7'
        }
    ]); // 채팅 데이터를 저장할 상태 변수

    const bringChat = async () => {
        try {
            // axios.get 메소드를 사용하여 데이터를 요청합니다.
            const response = await axios.get(`${SERVER_BASE_URL}/api/chat`, {
                headers: {
                    // 요청 헤더에 accessToken을 포함합니다.
                    'Authorization': `Bearer ${tokenState.accessToken}`
                }
            });
    
            // 요청이 성공적으로 완료되면 응답 데이터를 반환합니다.
            return response.data;
        } catch (error) {
            // 에러 처리
            console.error('Error fetching data:', error);
            return null; // 또는 적절한 에러 처리를 수행합니다.
        }
    };

    // useEffect(() => {
    //     bringChat().then(data => {
    //         setChats(data); // 가져온 채팅 데이터로 상태 업데이트
    //     });
    // }, []);

    return (
        <>
        <ChatContainer>
            <BottomSheetControllerBox>
                <BottomSheetContrller onPress={toggleBottomSheet}>
                    <BottomSheetControllerText>{kindOfChat}</BottomSheetControllerText>
                    <AntDesign name="down" size={20} color="black" />
                </BottomSheetContrller>
            </BottomSheetControllerBox>
            <SelectConfirmedChatBox>
                <SelectConfirmedChat onPress={()=>{
                    setConfrimButtonState(!confirmedButtonState);
                }}>
                    {confirmedButtonState
                        ? <AntDesign name="checksquare" size={24} color="black" />
                        : <AntDesign name="checksquareo" size={24} color="black" />
                    }
                    <SelectConfirmedChatText>약속 확정된 채팅방 모아보기</SelectConfirmedChatText>
                </SelectConfirmedChat>
            </SelectConfirmedChatBox>
            {/* 채팅 로그 */}   
            {chats.map((chat, index) => {
                // 여기에 추가 로직을 작성할 수 있습니다.
                return (
                    <ChattingLogBox key={index} onPress={()=>{
                        console.log('채팅방 클릭');
                        navigation.navigate('PersonalChatroom',{chatroomId: chat.roomId});
                    }}>
                        <ChattingLogImage source={{ uri: chat.profileImage }} />
                        <ChattingContentBox>
                            <ChattingNameandAgeBox>
                                <ChattingLogName>{chat.name}</ChattingLogName>
                                <ChattingLogAge>#{chat.age}</ChattingLogAge>
                            </ChattingNameandAgeBox>
                            <ChattingLogTimeandTextBox>                         
                                <ChattingLogText>{chat.text}</ChattingLogText>
                                <ChattingLogTime>{chat.time}</ChattingLogTime>
                            </ChattingLogTimeandTextBox>
                        </ChattingContentBox>
                    </ChattingLogBox>                 
                );
            })}
        </ChatContainer>
        <BottomSheet
                ref={bottomSheetRef}
                index={-1} // 기본 상태에서 Bottom Sheet를 숨깁니다.
                snapPoints={ ['40%']}
                handleComponent={null} // 핸들 컴포넌트를 제거하여 드래그 비활성화
                onChange={handleSheetChanges} // Bottom Sheet 상태 변경 시 콜백
            >
                <View style={{flex: 1, alignItems: 'center'}}>
                    <ModalButtonContainer bottomSheetRef={bottomSheetRef} // prop으로 bottomSheetRef 전달
                        setKindOfChat={setKindOfChat}>
                        <ModalButton onPress={() => {
                            setKindOfChat('전체 채팅');
                            bottomSheetRef.current?.close(); // Bottom Sheet 닫기
                        }}>
                            <ModalButtonText style={{ color: kindOfChat === '전체 채팅' ? '#749BC2' : '#000000' }}>전체 채팅</ModalButtonText>
                        </ModalButton>
                        <ModalButton onPress={() => {
                            setKindOfChat('받은 채팅');
                            bottomSheetRef.current?.close(); // Bottom Sheet 닫기
                        }}>
                            <ModalButtonText style={{ color: kindOfChat === '받은 채팅' ? '#749BC2' : '#000000' }}>받은 채팅</ModalButtonText>
                        </ModalButton>
                        <ModalButton onPress={() => {
                            setKindOfChat('보낸 채팅');
                            bottomSheetRef.current?.close(); // Bottom Sheet 닫기
                        }}>
                            <ModalButtonText style={{ color: kindOfChat === '보낸 채팅' ? '#749BC2' : '#000000' }}>보낸 채팅</ModalButtonText>
                        </ModalButton>
                    </ModalButtonContainer>
                </View>
        </BottomSheet>
      </>

    );
};

export default PersonalChat;

const ModalButtonContainer = styled.View`
    align-items: center;
    margin-top: 20px;
    `;

const ModalButton = styled.TouchableOpacity`
    width: 200px;
    height: 50px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    `;
const ModalButtonText = styled.Text`
    color: #000;
    font-size: 24px;
    font-weight: 800;
    `;