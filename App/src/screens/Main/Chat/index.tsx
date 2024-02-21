import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { userLoginState, userTokenState } from '../../../libs/Recoil/authState';
import axios from 'axios';
import SockJS from 'sockjs-client';

import * as Stomp from 'stompjs';

class ChatService {
  private stompClient: Stomp.Client;

  constructor(private serverUrl: string) {
    const socket = new WebSocket(serverUrl);
    this.stompClient = Stomp.over(socket);
  }

  connect(): void {
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);

      // 여기에 메시지 구독 등의 로직을 추가
    });
  }

  subscribeToChat(): void {
    this.stompClient.subscribe('/topic/chat', message => {
      const receivedMessage = JSON.parse(message.body);
      console.log(receivedMessage);
    });
  }

  sendMessage(message: string): void {
    this.stompClient.send("/app/chat", {}, JSON.stringify({message: message}));
  }

  disconnect(): void {
    if (this.stompClient !== null) {
      // 빈 콜백 함수를 인수로 전달
      this.stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    }
  }
}


  
const Chat: React.FC = () => {
    const loginState = useRecoilValue(userLoginState);
    const tokenState = useRecoilValue(userTokenState);

    return (
        <ChatContainer>
        </ChatContainer>
    )
};

export default Chat;

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;
