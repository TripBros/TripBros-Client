import React , {useEffect} from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';
import axios from 'axios';

const GroupChat = () => {
    const tokenState = useRecoilValue(userTokenState);

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
            <Text>Group Chat Component</Text>
        </ChatContainer>
    );
};

export default GroupChat;

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #ffffff;
`;