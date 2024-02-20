import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { calculateTimeWrittenAgo } from '../../../utils/timeUtils';

type DetailPostRouteProp = RouteProp<RootStackParamList, 'DetailPost'>;

interface DetailPostProps {
  route: DetailPostRouteProp;
}

const DetailPost: React.FC<DetailPostProps> = ({ route }) => {
  const { postData } = route.params;
  const navigation = useNavigation();

  const TimeWrittenAgo = calculateTimeWrittenAgo(postData.createdAt);

  const [likes, setLikes] = useState(postData.bookmarkCount);
  const [isLiked, setIsLiked] = useState(postData.isBookmarked); //사용자의 좋아요 여부

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 15 }}>
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <ProfileContainer>
        <ProfileImage source={postData.profileImage} />
        <View>
          <NameText>{`${postData.nickname}`}</NameText>
          <AgeSexText style={{ marginBottom: 0 }}>{`${postData.age} ${postData.sex}`}</AgeSexText>
        </View>
      </ProfileContainer>
      <DetailPostContainer>
        <Title>{postData.title}</Title>
        <DetailPostHeader>
          <PurposeText>{`# ${postData.purpose}`}</PurposeText>
          <TimeWrittenAgoText>{TimeWrittenAgo}</TimeWrittenAgoText>
        </DetailPostHeader>
        <DivisionLine/>
        <ContentContainer>
          <Content>{postData.content}</Content>
        </ContentContainer>
        <RowContainer>
          <ChatViewText>{`채팅 ${postData.chatCount}`}</ChatViewText>
          <ChatViewText style={{ marginLeft: 10 }}>{`조회 ${postData.hit}`}</ChatViewText>
        </RowContainer>
        <DivisionLine/>
        <RowContainer>
          <SimpleLineIcons name="plane" size={22} color="black" />
          <DatailText>{`${postData.country} ${postData.city}`}</DatailText>
        </RowContainer>
        <RowContainer>
          <Feather name="calendar" size={22} color="black" />
          <DatailText>{`${postData.startDate} - ${postData.endDate}`}</DatailText>
        </RowContainer>
        <RowContainer>
          <Octicons name="person" size={22} color="black" />
          <DatailText>{`${postData.nowHeadCount}/${postData.requiredHeadCount}명`}</DatailText>
        </RowContainer>
        <RowContainer>
          <Fontisto name="person" size={22} color="black" />
          <DatailText>{`${postData.preferAgeRange} 선호`}</DatailText>
        </RowContainer>
        <RowContainer>
          <Fontisto name="person" size={22} color="black" />
          <DatailText>{`${postData.preferSex} 선호`}</DatailText>
        </RowContainer>
      </DetailPostContainer>
      <DivisionLine/>
      <DetailPostFooter>
        <LikeContainer onPress={handleLikePress}>
          <AntDesign name={isLiked ? "heart" : "hearto"} size={19} color="red"/>
          <LikeText>{likes}</LikeText>
        </LikeContainer>
        <ChatButtonContainer onPress={() => {}}>
          <ChatStartText>1:1 채팅 시작하기</ChatStartText>
        </ChatButtonContainer>
      </DetailPostFooter>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default DetailPost;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const ProfileImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 7px;
`;

const NameText = styled.Text`
  font-size: 13px;
  margin-bottom: 4px;
  font-weight: bold;
`;

const AgeSexText = styled.Text`
  font-size: 12.5px;
`;

const DetailPostContainer = styled.View`
  padding: 25px;
`;

const Title = styled.Text`
  font-size: 21px;
  font-weight: bold;
`;

const DetailPostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0px;
`;

const PurposeText = styled.Text`
  color: #749BC2;
  font-size: 13px;
  font-weight: 700;
`;

const TimeWrittenAgoText = styled.Text`
  font-size: 12px;
  color: #989898;
`;

const DivisionLine = styled.View`
  height: 1px;
  background-color: #DEDEDE;
  margin: 12px 0px;
`;

const ContentContainer = styled.View`
  margin-bottom: 150px;
`;

const Content = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  line-height: 20px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0px;
`;

const ChatViewText = styled.Text`
  font-size: 12.5px;
  color: grey;
`;

const DatailText = styled.Text`
  font-size: 14px;
  margin-left: 10px;
`;

const DetailPostFooter = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LikeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0px 30px;
`;

const LikeText = styled.Text`
  margin-left: 5px;
`;

const ChatButtonContainer = styled.TouchableOpacity`
  background-color: #91C8E4;
  border-radius: 5px;
`

const ChatStartText = styled.Text`
  color: white;
  padding: 15px 80px;
  font-size: 14px;
  font-weight: 700;
`;