import React from "react";
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Header: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <Wrapper>
            <Title>
                <TripText>Trip</TripText>
                <BrosText>bros</BrosText>
            </Title>
            <TouchableOpacity onPress={() => navigation.navigate('Alarm')}>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
        </Wrapper>
    );
}

export default Header;

const Wrapper = styled.View`
height: 50px;
flex-direction: row;
background-color: white;
align-items: flex-end;
justify-content: space-between;
padding: 10px;
margin: 5px 15px;
`;

const Title = styled.View`
flex-direction: row;
align-items: baseline;
`;

const TripText = styled.Text`
font-size: 24px;
font-weight: bold;
color: black;
`;

const BrosText = styled.Text`
font-size: 24px;
font-weight: bold;
color: #749BC2;
`;