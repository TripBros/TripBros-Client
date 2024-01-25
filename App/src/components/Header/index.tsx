import React from "react";
import styled from 'styled-components/native';

const Header: React.FC = () => {
    return (
        <Wrapper>
            <Title>
                <TripText>Trip</TripText>
                <BrosText>bros</BrosText>
            </Title>
        </Wrapper>
    );
}

export default Header;

const Wrapper = styled.View`
  height: 50px;
  flex-direction: row;
  background-color: white;
  align-items: flex-end;
  padding-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  padding-horizontal: 10px;
`;

const TripText = styled.Text`
  color: black;
`;

const BrosText = styled.Text`
  color: #749BC2;
`;
