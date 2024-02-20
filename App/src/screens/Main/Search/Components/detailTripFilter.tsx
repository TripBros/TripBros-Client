import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import PreferredAgeRange from '../../../../components/Filter/preferredAgeRange';
import PreferredSex from '../../../../components/Filter/preferredSex';

const DetailTripFilter: React.FC = () => {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePurposePress = (purpose: string) => {
    setSelectedPurpose(purpose);
  };

  const handleAgeRangePress = (ageRange: string) => {
    setSelectedAgeRange(ageRange);
  };

  const handleSexPress = (Sex: string) => {
    setSelectedSex(Sex);
  };

  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return(
    <View style={{ marginTop: 10 }}>
      <DetailFilterContainer>
        <MaterialIcons name="tune" size={26} color="black" />
        <FilterText>더 많은 검색 필터 설정</FilterText>
        <CircleButton onPress={toggleDropdown}>
          <Feather name={isFilterOpen ? "chevron-up" : "chevron-down"} size={24} color="black"/>
        </CircleButton>
      </DetailFilterContainer>

      { isFilterOpen ? (
        <>
          <FilterTitle>동행 목적</FilterTitle>
          <DetailFilterContainer>
            {['여행', '식사', '숙박'].map((purpose) => (
              <PurposeContainer
                key={purpose}
                isSelected={selectedPurpose === purpose}
                onPress={() => handlePurposePress(purpose)}
              >
                <PurposeText>{purpose}</PurposeText>
              </PurposeContainer>
            ))}
          </DetailFilterContainer>

          <FilterTitle>선호 나이대</FilterTitle>
          <PreferredAgeRange
            selectedAgeRange={selectedAgeRange}
            onSelectAgeRange={handleAgeRangePress}/>

          <FilterTitle>선호하는 성별</FilterTitle>
          <PreferredSex
            selectedSex={selectedSex}
            onSelectSex={handleSexPress}/>
        </>
      ) : (
        <DetailFilterContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AdditionalText>동행 목적, 선호하는 나이대와 성별 선택이 가능해요!</AdditionalText>
        </DetailFilterContainer>
      )}
    </View>
  );
}
export default DetailTripFilter;

const DetailFilterContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 20px;
`;

const CircleButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #F6F4EB;
  justify-content: center;
  align-items: center;
`;

const FilterTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0px 5px 30px;
`
const FilterText = styled.Text`
    margin-horizontal: 8px;
    font-size: 15px;
`;

const AdditionalText = styled.Text`
    font-size: 13px;
    margin-vertical: 5px;
    color: #ACACAC;
`;

const PurposeContainer = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${props => props.isSelected ? '#F6F4EB' : 'white'};
  border: 1px solid ${props => props.isSelected ? '#F6F4EB' : 'black'};
  border-radius: 20px;
  padding: 10px;
  margin: 5px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PurposeText = styled.Text`
  color: black;
`;