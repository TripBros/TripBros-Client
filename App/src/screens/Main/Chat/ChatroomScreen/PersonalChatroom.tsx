import React, { useCallback, useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as StompJs from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../../libs/Recoil/authState";

import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatroomStackHeader from "../../../../components/Header/chatroomStackHeader";
import styled from "styled-components/native";

// 채팅을 위한 라이브러리 import
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Client } from '@stomp/stompjs';

import {
  ChatroomContainer,
  ChatroomInfoContainer,
  ChatroomTitle,
  ChatroomInfo,
  ChatroomInfoTextBox,
  ChatroomInfoText,
  ChatroomInfoAlert,
  ChatroomPlanButtonBox,
  ChatroomPlanButton,
  ChattingContainer,
  MessageContainer,
  TimeTextBox,
  TimeText,
  MessageBox,
  ChatText,
  InputChattingBox,
  InputChatting,
  SendButton,
} from "./styles";

//icon
import { SimpleLineIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface messageProp {
  userName: string;
  profileImage: string;
  content: string;
  sentAt: string;
	// isSystemMessage:boolean;
}

const PersonalChatroom: React.FC = () => {
  const route = useRoute();
  const { chatroomId } = route.params as { chatroomId: string };
  const token = useRecoilValue(userTokenState);

  // 클라이언트 이름 상태 변수
  const [clientName, setClientName] = useState<string>('seungjun'); 

  const initialMessages = [
    {
      "userName": "seungjun",
      "profileImage": "https://example.com/profiles/jinsoo.jpg",
      "content": "안녕하세요, 첫 번째 메시지입니다!",
      "sentAt": "2024-02-25T09:00:00Z"
    },
    {
      "userName": "Minji",
      "profileImage": "https://example.com/profiles/minji.jpg",
      "content": "오늘 모두 좋은 하루 보내세요!",
      "sentAt": "2024-02-25T09:05:00Z"
    },
    ];

  // 채팅방 데이터를 저장할 상태
  const [chatroomData, setChatroomData] = useState({
    name: "오승준",
    messages: [],
  });
  
  const [message, setMessage] = useState<messageProp>({
    userName: "user",
    profileImage: "https://placeimg.com/100/100/any",
    content: "",
    sentAt: "",
  });
  const [messages, setMessages] = useState<messageProp[]>(initialMessages); // 채팅방 메시지를 저장할 상태

  // 웹소켓 클라이언트 상태를 저장할 상태
  const [stompClientState, setStompClientState] = useState<StompJs.Client | null>(null);

  // 채팅방 데이터를 불러오는 함수
  const fetchChatroomData = useCallback(
    async (chatroomId: string) => {
      try {
        const response = await axios.get(
          `채팅방 불러오기 API 주소 + ${chatroomId} `,
        );
        setChatroomData({
          name: response.data.name,
          messages: response.data.messages,
        });
      } catch (error) {
        console.error("Error fetching chat room data:", error);
      }
    },
    [chatroomId],
  ); // chatRoomId가 변경될 때만 함수를 재생성

  // useEffect(() => {
  //   // 채팅방 정보를 불러오는 API 호출
  //   fetchChatroomData(chatroomId);
  // }, [chatroomId, token]); // chatroomId와 userToken이 변경될 때마다 effect를 다시 실행

  const formatMessageTime = (sentAt: string) => {
    const sentDate: Date = new Date(sentAt);
    const now: Date = new Date();
    const diffInMinutes: number = Math.floor((now.getTime() - sentDate.getTime()) / 60000);

    if (diffInMinutes < 10) {
      return `${diffInMinutes}분 전`;
    } else {
      // 10분 이상인 경우 시간:분 형식으로 반환
      return sentDate.getHours().toString().padStart(2, '0') + ':' + sentDate.getMinutes().toString().padStart(2, '0');
    }
  }
  
  const sendMessage = useCallback(() => {
    console.log('sendMessage 함수 호출됨');
    if (stompClientState && message.content.trim() !== '') {
      // 서버로 전송할 메시지 객체
      const chatMessage = {
        message: message.content,
      };
      console.log('메시지 전송 전:', chatMessage);

      // 서버로 메시지 전송
      stompClientState.publish({
        destination: "/pub/chat/9b4c8864-8233-4b6f-9fc0-cf97569fef94", // 메시지를 전송할 서버의 엔드포인트. 실제 엔드포인트로 변경해야 합니다.
        body: JSON.stringify(chatMessage),
      });
      console.log('메시지 전송 후:', chatMessage);
      // 메시지 입력 필드 초기화
      setMessage({ ...message, content: "" }); // 기존 sender와 time 값을 유지하면서 text만 초기화
    }
  }, [stompClientState, message]);
  

  // UI에 메시지 추가하는 함수 예시 (구현 필요)
  const addMessageToState = (chatMessage:messageProp) => {
    setMessages(prevMessages => [...prevMessages, chatMessage]);
  };
  useEffect(() => {
      // WebSocket을 이용한 Stomp 클라이언트 설정
      // Client 객체 인스턴스화
      // Stomp 클라이언트 인스턴스 생성
      const stompClient = new StompJs.Client({
        brokerURL: 'ws://20.214.153.179:8080/ws-endpoint',
        connectHeaders: {
          Authorization: `Bearer ${token.accessToken}`,
        },
        debug: function (str) {
          console.log('STOMP: ', str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });


    // 객체 생성 확인
    console.log('STOMP Client 객체 생성:', stompClient);

    stompClient.activate();
    setStompClientState(stompClient);
    // 에러 발생 시 처리
    stompClient.onStompError = (error) => {
      console.error('STOMP Error:', error);
    };

    const headers = {
      Authorization: `Bearer ${token.accessToken}`,
    };

    stompClient.onConnect = (frame) => {
      console.log('STOMPJS 웹소켓 연결:', frame);

      // 서버에 구독
      stompClient.subscribe('/sub/chat/9b4c8864-8233-4b6f-9fc0-cf97569fef94', (message) => {
        // 메시지 처리
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        console.log('구독한 서버로부터 받은 메시지',receivedMessage);
      },headers);
    };

    

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate().then(() => {
          console.log("Stomp client 서버 연결 해제");
        });
      }
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ChatroomStackHeader title={chatroomData.name} age={"20대 남성"} />
      <ChatroomContainer>
        <ChatroomInfoContainer>
          <ChatroomTitle>채팅방 제목</ChatroomTitle>
          <ChatroomInfo>
            <ChatroomInfoTextBox>
              <SimpleLineIcons name="plane" size={16} color="black" />
              <ChatroomInfoText> 강릉</ChatroomInfoText>
            </ChatroomInfoTextBox>
            <ChatroomInfoTextBox>
              <Entypo name="calendar" size={16} color="black" />
              <ChatroomInfoText> 날짜 </ChatroomInfoText>
            </ChatroomInfoTextBox>
            <ChatroomInfoTextBox>
              <Feather name="users" size={16} color="black" />
              <ChatroomInfoText> 인원 </ChatroomInfoText>
            </ChatroomInfoTextBox>
          </ChatroomInfo>
          <ChatroomInfoAlert>
            해당 게시글을 통하여 시작된 채팅입니다.
          </ChatroomInfoAlert>
        </ChatroomInfoContainer>
        <ChatroomPlanButtonBox>
          <ChatroomPlanButton>
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "800" }}>
              약속 잡기
            </Text>
          </ChatroomPlanButton>
        </ChatroomPlanButtonBox>
      </ChatroomContainer>
      <ChattingContainer>
      {messages.map((message, index) => (
        <MessageContainer key={index} sender={message.userName} client={clientName}>
          {message.userName === clientName && 
          <TimeTextBox>
            <TimeText>{formatMessageTime(message.sentAt)}</TimeText>
          </TimeTextBox>}
          <MessageBox sender={message.userName} client={clientName}>
            <ChatText sender={message.userName} client={clientName}>{message.content}</ChatText>
          </MessageBox>
          {message.userName !== clientName && 
          <TimeTextBox>
            <TimeText>{formatMessageTime(message.sentAt)}</TimeText>
          </TimeTextBox>}
        </MessageContainer>
      ))}
      </ChattingContainer>
      <InputChattingBox>
        <InputChatting
          value={message.content}
          onChangeText={(newText: string) => {
            console.log("입력된 메시지: ", newText); // 콘솔에 입력된 텍스트를 로그로 출력
            setMessage((prevMessage) => ({
              ...prevMessage,
              content: newText,
            }));
          }}
          placeholder="메시지를 입력해주세요"
        />
        <SendButton onPress={sendMessage}>
          <MaterialCommunityIcons name="send" size={24} color="black" />
        </SendButton>
      </InputChattingBox>
    </SafeAreaView>
  );
};

export default PersonalChatroom;

