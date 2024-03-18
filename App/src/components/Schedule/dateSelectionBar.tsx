import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface DateSelectionBarProps {
  displayedDates: string;
  onPress: () => void;
  isChosen: boolean;
}

interface DisplayDatesTextProps {
  displayed: boolean;
}

const DateSelectionBar: React.FC<DateSelectionBarProps> = ({ displayedDates, onPress, isChosen }) => {
  return (
    <SearchBarContainer ischosen={isChosen}>
      <Feather name="calendar" size={24} color="black" />
      <TouchableOpacity onPress={onPress}>
        {displayedDates 
          ? <DisplayDatesText displayed={true}>{displayedDates}</DisplayDatesText>
          : <DisplayDatesText displayed={false}>날짜를 선택해주세요</DisplayDatesText>}
      </TouchableOpacity>
    </SearchBarContainer>
  );
};
export default DateSelectionBar;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: ${(props) => (props.ischosen ? '10px' : '30px')};
  padding-horizontal: 20px;
  padding-vertical: 5px;
  margin-horizontal: ${(props) => (props.ischosen ? '25px' : '0px')};
  margin-vertical: ${(props) => (props.ischosen ? '0px' : '10px')};
  ${props => props.ischosen ? '' : 'width: 80%;'};
`;

const DisplayDatesText = styled.Text<DisplayDatesTextProps>`
  flex: 1;
  height: 40px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  color: ${props => props.displayed ? 'black' : '#C4C4C4'};
`;
