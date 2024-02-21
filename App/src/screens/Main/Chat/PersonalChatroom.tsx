import React, {useCallback, useRef, useState, useEffect } from "react";
import { View, Text } from 'react-native';
import * as StompJs from "@stomp/stompjs";
import { useRecoilValue } from "recoil";
import { userTokenState } from "../../../libs/Recoil/authState";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { useRoute } from '@react-navigation/native';

interface ChatRoomProps{
    roomId: string;
    roomName: string;
}
const PersonalChatroom: React.FC = () => {
    const route = useRoute(); 
    const { roomId } = route.params as { roomId: string };
    // const tokenState = useRecoilValue(userTokenState);

    // // 채팅방 데이터를 저장할 상태
    // const [chatRoomData, setChatRoomData] = useState({ name: '', messages: [] });

    // // 웹소켓 클라이언트 상태를 저장할 상태
    // const [stompClient, setStompClient] = useState<any>(null);

    // // 채팅방 데이터를 불러오는 함수
    // const fetchChatRoomData = useCallback(async () => {
    //     try {
    //       const response = await axios.get(`채팅방 불러오기 API 주소 + roomId `);
    //       setChatRoomData({ name: response.data.name, messages: response.data.messages });
    //     } catch (error) {
    //       console.error('Error fetching chat room data:', error);
    //     }
    //   }, [roomId]); // chatRoomId가 변경될 때만 함수를 재생성


    // useEffect(() => {
    //     const socket = new SockJS('/your-endpoint');
    //     const stompClient = Stomp.over(socket);
    //     stompClient.connect({}, frame => {
    //       // 연결 성공 후, 해당 채팅방 구독
    //       stompClient.subscribe(`/topic/chatrooms/${roomId}`, message => {
    //         // 메시지 수신 처리
    //       });
    //       fetchChatRoomData();
    //     });
      
    //     return () => {
    //         // 채팅방을 떠날 때 웹소켓 연결 종료
    //         if (stompClient) {
    //             stompClient.disconnect(() => {
    //                 console.log('disconnected');
    //                 })};
    //             }
    //   }, [roomId]);


    return (
        <View>
            <Text>Chat Room</Text>
        </View>
    );
};

export default PersonalChatroom;