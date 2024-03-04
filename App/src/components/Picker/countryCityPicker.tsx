import React, { useState } from "react";
import styled from "styled-components/native";
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';

const countriesAndCities = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

const CountryCityPicker: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countryItems = Object.keys(countriesAndCities).map((country) => ({
    label: country,
    value: country,
  }));

  const cityItems = selectedCountry && countriesAndCities[selectedCountry]
    ? countriesAndCities[selectedCountry].map((city) => ({
        label: city,
        value: city,
      }))
    : [];

  return (
    <>
      <SearchBarContainer>
        <Feather name="search" size={24} color="black" />
        <RNPickerSelect
            onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedCity("");
            }}
            items={countryItems}
            placeholder={{ label: "나라를 선택해주세요", value: null }}
            style={{
              inputIOS: {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
              },
              inputAndroid: {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
              },
          }}
          doneText="확인"
          />
      </SearchBarContainer>
      
      <SearchBarContainer>
        <Feather name="search" size={24} color="black" />
        <RNPickerSelect
            onValueChange={(value) => setSelectedCity(value)}
            items={cityItems}
            placeholder={{ label: "도시를 선택해주세요", value: null }}
            disabled={!selectedCountry}
            style={{
              inputIOS: {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
              },
              inputAndroid: {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
              },
          }}
          doneText="확인"
          />
      </SearchBarContainer>
    </>
  );
};

export default CountryCityPicker;

const SearchBarContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: 30px;
  padding-horizontal: 20px;
  padding-vertical: 5px;
  margin: 10px;
  width: 80%;
`;