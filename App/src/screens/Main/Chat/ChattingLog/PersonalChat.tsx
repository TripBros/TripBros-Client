import React, { useEffect,useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


//icon
import { AntDesign } from '@expo/vector-icons';

interface Chat {
    profileImage: string;
    name: string;
    age: string;
    time: string;
    text: string;
}
const PersonalChat = () => {
    const tokenState = useRecoilValue(userTokenState);
    const [confirmedButtonState,setConfrimButtonState] = useState<boolean>(false);

    //bottom sheet
    const [visible, setVisible] = useState(false);
    const height = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
        transform: [{ translateY: height.value }],
        };
    });
    const toggleBottomSheet = () => {
        setVisible(!visible);
        height.value = withSpring(visible ? 300 : 0); // -300은 bottom sheet의 높이에 따라 조정
        console.log(visible);
      };


    const [chats, setChats] = useState<Chat[]>([
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김영희',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '김철수',
            age: '20대 여성',
            time: '3분 전',
            text: '안녕하세요'
        }
    ]); // 채팅 데이터를 저장할 상태 변수

    const bringChat = async () => {
        try {
            // axios.get 메소드를 사용하여 데이터를 요청합니다.
            const response = await axios.get('개인채팅 불러오기 API', {
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
                    <ChattingLogBox key={index}>
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

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #ffffff;
`;

const BottomSheetControllerBox = styled.View`
    width: 100%;
    background-color: #ffffff;
    justify-content: flex-end;
    
`;
const BottomSheetContrller = styled.TouchableOpacity`
    width: 40%;
    height: 50px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;
`;

const BottomSheetControllerText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin-right: 10px;
`;

const SelectConfirmedChatBox = styled.View`
    width: 100%;
    height: 50px;
    background-color: #ffffff;

`;

const SelectConfirmedChat = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    margin-left: 10px;
`;

const SelectConfirmedChatText = styled.Text`
    font-size: 16px;
    color: #000000;
    margin-left: 10px;
`;

const ChattingLogBox = styled.TouchableOpacity`
    width: 100%;
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

const ChattingLogImage = styled.Image` 
    width: 50px;
    height: 50px;
    background-color: #D9D9D9;
    border-radius: 50px;
`;

const ChattingContentBox = styled.View`
    background-color: #ffffff;
    flex: 1;
    margin-left: 15px;
`;

const ChattingNameandAgeBox = styled.View`
    flex-direction: row;
`;

const ChattingLogName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000000;
`;

const ChattingLogAge = styled.Text`
    font-size: 16px;
    color: #749BC2;
    margin-left: 10px;
`;

const ChattingLogTimeandTextBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ChattingLogTime = styled.Text`
    font-size: 16px;
    color: #9E9E9E;
`;

const ChattingLogText = styled.Text`
    font-size: 16px;
    color: #000000;
`;
