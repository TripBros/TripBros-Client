import React, { useState } from "react";
import styled from "styled-components/native";
import RNPickerSelect from 'react-native-picker-select';

const countriesAndCities = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

const CreateCountryCityPicker: React.FC = () => {
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
      <Title>나라를 선택해주세요</Title>
      <SearchBarContainer>
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
      
      <Title>도시를 선택해주세요</Title>
      <SearchBarContainer>
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

export default CreateCountryCityPicker;

const SearchBarContainer = styled.TouchableOpacity`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 4px 0px;
  margin: 0px 25px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 25px 30px 10px;
`;