import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface chatroomStackHeaderProps {
    title: string,
    age : string,
}

const ChatroomStackHeader: React.FC<chatroomStackHeaderProps> = ({ title ,age}) => {
    const navigator = useNavigation();
    return (
        <StackHeaderBox>
            <TouchableOpacity
                style={{width: 24, height: 24}}
                onPress={() => navigator.goBack()
                }>
            <AntDesign name="left" size={30} color="black" style={{marginLeft:5}}/>
            </TouchableOpacity>
            <TitleText>{title}</TitleText> 
            <AgeText>#{age}</AgeText>
        </StackHeaderBox>
    );
};

export default ChatroomStackHeader;

const StackHeaderBox = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    background-color:  #fff;
    shadow-color: #000;
`;

const TitleText = styled.Text`
    color: black;
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 5px;
`;

const AgeText = styled.Text`
    color: #749BC2;
    font-size: 16px;
    margin-left: 10px;
    margin-top: 5px;
`;