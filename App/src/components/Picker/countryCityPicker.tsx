import React, { useState } from "react";
import styled from "styled-components/native";
import { Modal, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const countriesAndCities = {
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  // 다른 나라와 도시 추가
};

const CountryCityPicker: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isCountryPickerVisible, setIsCountryPickerVisible] = useState(false);
  const [isCityPickerVisible, setIsCityPickerVisible] = useState(false);

  const handleCountryConfirm = () => {
    setIsCountryPickerVisible(false);
    // Reset city when country changes
    setSelectedCity("");
  };

  const handleCityConfirm = () => {
    setIsCityPickerVisible(false);
  };

  return (
    <Container>
      <PlaceholderText onPress={() => setIsCountryPickerVisible(true)}>
        {selectedCountry || "나라를 선택해주세요"}
      </PlaceholderText>
      <PlaceholderText
        onPress={() => {
          if (selectedCountry) {
            setIsCityPickerVisible(true);
          }
        }}
      >
        {selectedCity || "도시를 선택해주세요"}
      </PlaceholderText>

      <Modal visible={isCountryPickerVisible} transparent={true} animationType="slide">
        <ModalView>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => {
              setSelectedCountry(itemValue);
            }}
          >
            <Picker.Item label="나라를 선택해주세요" value="" />
            {Object.keys(countriesAndCities).map((country) => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
          <Button title="확인" onPress={handleCountryConfirm} />
        </ModalView>
      </Modal>

      <Modal visible={isCityPickerVisible} transparent={true} animationType="slide">
        <ModalView>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => {
              setSelectedCity(itemValue);
            }}
          >
            <Picker.Item label="도시를 선택해주세요" value="" />
            {selectedCountry &&
              countriesAndCities[selectedCountry].map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
          </Picker>
          <Button title="확인" onPress={handleCityConfirm} />
        </ModalView>
      </Modal>
    </Container>
  );
};

export default CountryCityPicker;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.Text`
  font-size: 16px;
  color: #000;
`;

const ModalView = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
`;