import React, { useEffect,useState,useRef,useMemo,useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigators/RootNavigator';
import BottomSheet from '@gorhom/bottom-sheet';
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
    const [isVisible, setIsVisible] = useState(false);
    const bottomSheetRef = useRef(null);
    const toggleBottomSheet = () => {
        setIsVisible(!isVisible);
        console.log(isVisible);
      };


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
                    <BottomSheetControllerText>전체 채팅</BottomSheetControllerText>
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
        <View>
            <BottomSheet
                ref={bottomSheetRef}
                index={isVisible ? 0 : -1}
                snapPoints={['25%', '50%']}
            >
            <View>
                <Text>Bottom Sheet Content</Text>
            </View>
            </BottomSheet>
        </View>
        {/* <Animated.View
        style={[
          { 
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 500, // Bottom Sheet의 높이
            backgroundColor: 'white',
          },
          animatedStyle,
        ]}
      >
      </Animated.View> */}
      </>

    );
};

export default PersonalChat;

