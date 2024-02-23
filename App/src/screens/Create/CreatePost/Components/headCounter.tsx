import React, { useState } from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

interface HeadCounterProps {
  count: number;
  setCount: (count: number) => void;
}

const HeadCounter: React.FC<HeadCounterProps> = ({ count, setCount }) => {
  const increaseCount = () => setCount(count + 1);
  const decreaseCount = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <Container>
      <CounterContainer>
        <Octicons name="person" size={22} color="black" />
        <CountText>{`${count}명`}</CountText>
      </CounterContainer>
      <ButtonContainer>
        <Button onPress={increaseCount}>
          <AntDesign name="pluscircle" size={35} color="#91C8E4" />
        </Button>
        <Button onPress={decreaseCount}>
          <AntDesign name="minuscircle" size={35} color="#91C8E4" />
        </Button>
      </ButtonContainer>
    </Container>
  );
};
export default HeadCounter;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CounterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: grey;
  border-radius: 10px;
  padding: 10px 60px;
  margin-right: 20px;
`;

const CountText = styled.Text`
  margin-left: 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-horizontal: 10px;
`;

