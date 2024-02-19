import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { userLoginState, userTokenState } from '../../../libs/Recoil/authState';
import axios from 'axios';
import MyTab from '../../../navigators/ChatNavigator';

const Chat: React.FC = () => {
    const loginState = useRecoilValue(userLoginState);
    const tokenState = useRecoilValue(userTokenState);

    const bringChat = async () => {
        try {
            // axios.get 메소드를 사용하여 데이터를 요청합니다.
            const response = await axios.get('채팅 불러오기 API', {
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
        if (loginState) {
            const responseData = bringChat();
        }
    }, [])

    // 미로그인시 
    if (!loginState) {
        return (
            <ChatContainer>
                <Text>로그인이 필요합니다.</Text>
            </ChatContainer>
        )
    }

    
    // 로그인시 
    return (
        <ChatContainer>
            <MyTab/>

        </ChatContainer>
    )
};

export default Chat;

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;
