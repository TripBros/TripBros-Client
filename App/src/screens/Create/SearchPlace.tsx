import React from "react";
import { SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";

const API_KEY = 'AIzaSyA_mnXBbHwf7YMHFbR0T06JLhOwoXByzDc';

const SearchPlace = ({ route }) => {
  const { onReturn } = route.params;
  const navigation = useNavigation();

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ zIndex: 1, flex: 1 }}>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
      </HeaderContainer>
        <GooglePlacesAutocomplete
          placeholder="장소 + 도시 검색 (ex. Liberty Bagle New York)"
          onPress={(data, details = null) => {
            const placeInfo = {
              description: '',
              latitude: 0,
              longitude: 0,
              placeId: ''
            };
            
            if (details) {
              placeInfo.description = data.description;
              placeInfo.latitude = details.geometry.location.lat;
              placeInfo.longitude = details.geometry.location.lng;
              placeInfo.placeId = details.place_id;
            }
            
            onReturn(placeInfo);
            navigation.goBack();
          }}
          fetchDetails={true}
          query={{  key: API_KEY,
                  language: 'en'  }}
          onFail={error => console.log(error)}
          styles={{
            textInput: {
              height: 50,
              paddingHorizontal: 10,
            },
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
export default SearchPlace;

const HeaderContainer = styled.View`
  padding: 10px 15px;
`;