import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

interface PreferredSexProps {
  selectedSex: string | null;
  onSelectSex: (sex: string) => void;
}

const PreferredSex: React.FC<PreferredSexProps> = ({ selectedSex, onSelectSex }) => {
  return (
    <DetailFilterContainer>
      {['남성', '여성', '무관'].map((sex) => (
        <PurposeContainer
          key={sex}
          isSelected={selectedSex === sex}
          onPress={() => onSelectSex(sex)}
        >
          <PurposeText>{sex}</PurposeText>
        </PurposeContainer>
      ))}
    </DetailFilterContainer>
  );
};
export default PreferredSex;

const DetailFilterContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0px 20px;
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