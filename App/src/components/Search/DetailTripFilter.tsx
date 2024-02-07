import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const DetailTripFilter: React.FC = () => {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //const purposes = ['여행', '식사', '숙박', '기타'];
  const ageRanges = ['20대', '30대', '40대', '50대', '60대', '무관'];

  // 배열을 3개씩 나누기 위한 함수
  const splitArray = (array: string[], elementsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < array.length; i += elementsPerRow) {
      rows.push(array.slice(i, i + elementsPerRow));
    }
    return rows;
  };
  
  const ageRangeRows = splitArray(ageRanges, 3);

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
          {ageRangeRows.map((row, index) => (
            <DetailFilterContainer key={index}>
              {row.map((ageRange) => (
                <PurposeContainer
                  key={ageRange}
                  isSelected={selectedAgeRange === ageRange}
                  onPress={() => handleAgeRangePress(ageRange)}
                >
                  <PurposeText>{ageRange}</PurposeText>
                </PurposeContainer>
              ))}
            </DetailFilterContainer>
          ))}

        <FilterTitle>선호하는 성별</FilterTitle>
        <DetailFilterContainer>
          {['남성', '여성', '무관'].map((sex) => (
            <PurposeContainer
              key={sex}
              isSelected={selectedSex === sex}
              onPress={() => handleSexPress(sex)}
            >
              <PurposeText>{sex}</PurposeText>
            </PurposeContainer>
          ))}
        </DetailFilterContainer>
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
    font-size: 20px;
    font-weight: bold;
    padding: 5%;
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