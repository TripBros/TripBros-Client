import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';

const BookmarkPlaces: React.FC = () => {
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="내가 저장한 장소"/>
            <BookmarkPlacesContainer>
                <Text>BookmarkPlaces</Text>
                {/* Add your content here */}
            </BookmarkPlacesContainer>
        </SafeAreaView>
    );
};

export default BookmarkPlaces;

const BookmarkPlacesContainer = styled.View`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
`;
