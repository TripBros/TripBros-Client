import React from 'react';
import styled from 'styled-components/native';

interface PreferredAgeRangeProps {
  selectedAgeRange: string | null;
  onSelectAgeRange: (ageRange: string) => void;
}

const PreferredAgeRange: React.FC<PreferredAgeRangeProps> = ({ selectedAgeRange, onSelectAgeRange }) => {
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

  return (
    <>
      {ageRangeRows.map((row, index) => (
        <DetailFilterContainer key={index}>
          {row.map((ageRange) => (
            <PurposeContainer
              key={ageRange}
              isSelected={selectedAgeRange === ageRange}
              onPress={() => onSelectAgeRange(ageRange)}
            >
              <PurposeText>{ageRange}</PurposeText>
            </PurposeContainer>
          ))}
        </DetailFilterContainer>
      ))}
    </>
  );
};

export default PreferredAgeRange;

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