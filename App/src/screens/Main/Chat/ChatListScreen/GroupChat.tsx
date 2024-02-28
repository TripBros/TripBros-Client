import React , {useEffect,useState} from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';
import {
    ChatContainer,
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

interface Chat {
    profileImage: string;
    name: string;
    time: string;
    text: string;
    roomId : string;
}

const GroupChat = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const tokenState = useRecoilValue(userTokenState);


    const [chats, setChats] = useState<Chat[]>([
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '대화방 1',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '1'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '대화방 2',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '2'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '대화방 3',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '3'
        },
        {
            profileImage: 'https://placeimg.com/100/100/any',
            name: '대화방 4',
            time: '3분 전',
            text: '안녕하세요',
            roomId: '4'
        },
    ]); // 채팅 데이터를 저장할 상태 변수
    const bringChat = async () => {
        try {
            // axios.get 메소드를 사용하여 데이터를 요청합니다.
            const response = await axios.get('그룹 채팅 불러오기 API', {
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

    useEffect(() => {
        const responseData = bringChat();
    }
    , [])

    return (
        <ChatContainer>
            {/* 채팅 로그 */}   
            {chats.map((chat, index) => {
                // 여기에 추가 로직을 작성할 수 있습니다.
                return (
                    <ChattingLogBox key={index} onPress={()=>{
                        console.log('채팅방 클릭');
                        navigation.navigate('GroupChatroom',{chatroomId: chat.roomId});
                    }}>
                        <ChattingLogImage source={{ uri: chat.profileImage }} />
                        <ChattingContentBox>
                            <ChattingNameandAgeBox>
                                <ChattingLogName>{chat.name}</ChattingLogName>
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
    );
};

export default GroupChat;
