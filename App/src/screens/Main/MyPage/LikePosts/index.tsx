import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';

const LikePosts: React.FC = () => {
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="내가 좋아요한 게시글"/>
            <LikePostsContainer>
                <Text>LikePosts</Text>
                {/* Add your content here */}
            </LikePostsContainer>
        </SafeAreaView>
    );
};

export default LikePosts;

const LikePostsContainer = styled.View`
    flex: 1;
    background-color: white;
`;
