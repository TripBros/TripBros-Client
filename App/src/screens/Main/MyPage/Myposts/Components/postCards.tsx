import React from 'react';
import { View, Text } from 'react-native';
import {
    PostCard,
    PostContentBox,
    Title,
    Content,
    EtcBox,
    HowManyChat,
    ChatNum,
    HowManyLike,
    LikeNum,
} from '../styles';
import { useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface PostProps {
    title: string;
    content: string;
    chatNum: number;
    likeNum: number;
    date: string;
}
const PostCards:React.FC<PostProps> = ({title,content,chatNum,likeNum,date}) => {
    const navigation = useNavigation();
    return (
                <PostCard onPress={()=> navigation.navigate('Post')}>
                    <PostContentBox>
                        <Title>{title}</Title>
                        <Content>{content}</Content>
                        <EtcBox>
                            <View style={{flexDirection:'row'}}>
                                <HowManyChat>
                                    <Ionicons name="chatbox-outline" size={16} color="#749BC2" />
                                    <ChatNum>{chatNum}</ChatNum>
                                </HowManyChat>
                                <HowManyLike>
                                    <Ionicons name="heart-outline" size={16} color="#FF2F2F" />
                                    <LikeNum>{likeNum}</LikeNum>
                                </HowManyLike>
                            </View>
                            <Text>{date}</Text>
                        </EtcBox>
                    </PostContentBox>
                </PostCard>
    );
};

export default PostCards;
