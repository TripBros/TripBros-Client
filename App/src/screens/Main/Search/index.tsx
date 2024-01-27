import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import PlusButton from '../../../components/ActionButton/PlusButton';
import TripFilter from '../../../components/Search/TripFilter';

const Search: React.FC = () => {
    return (
        <View>
            <Title>여행 정보를 입력하세요</Title>
            <TripFilter />
            <PlusButton />
        </View>
    );
};

const Title = styled.Text`
font-size: 20px;
font-weight: bold;
padding: 5%;
`;

export default Search;
