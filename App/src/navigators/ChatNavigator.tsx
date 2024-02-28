import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalChat from '../screens/Main/Chat/ChatListScreen/PersonalChat';
import GroupChat from '../screens/Main/Chat/ChatListScreen/GroupChat';
import { useRecoilValue } from 'recoil';
import { userLoginState } from '../libs/Recoil/authState';
import styled from 'styled-components/native';

const Tab = createMaterialTopTabNavigator();

const ChatNavigator = () => {
    const loginState = useRecoilValue(userLoginState)

    if (!loginState) {
        return (
            <ChatContainer>
                <Text>로그인이 필요합니다.</Text>
            </ChatContainer>
        );
    }

    return (
      <Tab.Navigator>
        <Tab.Screen name="개인 채팅" component={PersonalChat} />
        <Tab.Screen name="그룹 채팅" component={GroupChat} />
      </Tab.Navigator>
    );
  }

export default ChatNavigator;

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #ffffff;
`;