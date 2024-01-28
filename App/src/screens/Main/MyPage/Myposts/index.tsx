import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader'
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';

const MyPosts = () => {
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="내가 작성한 게시글"/>
            <MyPostsContainer>
                <Text>My Posts</Text>
                {/* Add your content here */}
            </MyPostsContainer>
        </SafeAreaView>
    );
};

export default MyPosts;

const MyPostsContainer = styled.View`
    flex: 1;
    background-color: white;
`;