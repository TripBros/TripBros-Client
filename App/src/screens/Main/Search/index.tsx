import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import PlusButton from '../../../components/ActionButton/PlusButton';
import TripFilter from '../../../components/Search/TripFilter';
import DetailTripFilter from '../../../components/Search/DetailTripFilter';

const Search: React.FC = () => {
    return (
        <SearchContainer>
            <Title>여행 정보를 입력하세요</Title>
            <TripFilter />
            <DetailTripFilter />
            <SubmitButton>
                <ButtonText>게시글 확인하기</ButtonText>
                <Feather name="arrow-right" size={20} color="white" />
            </SubmitButton>
            <PlusButton />
        </SearchContainer>
    );
};

const SearchContainer = styled.View`
    background-color: white;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 5%;
`;

const FilterTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 5%;
`
const SubmitButton = styled.TouchableOpacity`
  background-color: #91C8E4;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default Search;
