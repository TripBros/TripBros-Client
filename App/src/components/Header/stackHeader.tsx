import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

interface StackHeaderProps {
    title: string;
}

const StackHeader: React.FC<StackHeaderProps> = ({ title }) => {
    const navigator = useNavigation();
    return (
        <StackHeaderBox>
            <TouchableOpacity
                style={{width: 24, height: 24}}
                onPress={() => navigator.goBack()
                }>
            <AntDesign name="left" size={30} color="white" style={{marginLeft:5}}/>
            </TouchableOpacity>
            <Text style={{color: '#fff', fontWeight: 'bold',fontSize:24}}>{title}</Text>
            <View style={{width: 24, height: 24}}></View>{/* 빈 요소로 균형을 맞추기 위함 */}
        </StackHeaderBox>
    );
};

export default StackHeader;

const StackHeaderBox = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #749BC2;
    shadow-color: #000;
    
`;