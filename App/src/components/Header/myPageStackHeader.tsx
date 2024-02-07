import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface StackHeaderProps {
    title: string;
}

const MyPageStackHeader: React.FC<StackHeaderProps> = ({ title }) => {
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
        </StackHeaderBox>
    );
};

export default MyPageStackHeader;

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