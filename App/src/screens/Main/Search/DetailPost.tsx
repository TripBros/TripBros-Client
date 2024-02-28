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
import { ScrollView } from 'react-native-gesture-handler';

type DetailPostRouteProp = RouteProp<RootStackParamList, 'DetailPost'>;

interface DetailPostProps {
  route: DetailPostRouteProp;
}

const DetailPost: React.FC<DetailPostProps> = ({ route }) => {
  const navigation = useNavigation();
  const { postData } = route.params;

  const TimeWrittenAgo = calculateTimeWrittenAgo(postData.createdAt);

  const [likes, setLikes] = useState(postData.bookmarkCount);
  const [isLiked, setIsLiked] = useState(postData.isBookmarked); //사용자의 좋아요 여부

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  //프로필 더보기
  const [profileMore, setProfileMore] = useState(false);

  const toggleProfileMore = () => {
    setProfileMore(!profileMore);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </HeaderContainer>

      <ScrollView>
      <View>
        <ProfileContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ProfileImage source={postData.profileImage}/>
            <View>
              <NameText>{postData.nickname}</NameText>
              <AgeSexText>{`${postData.age} ${postData.sex}`}</AgeSexText>
            </View>
          </View>
          <TouchableOpacity onPress={toggleProfileMore}>
            <Ionicons name={profileMore ? "chevron-up" : "chevron-down"} size={25} color="black" />
          </TouchableOpacity>
        </ProfileContainer>
        {profileMore && (
          <HorizontalView>
            <TextContainer>
              <PersonalText>여유로운 일정</PersonalText>
            </TextContainer>
            <TextContainer>
              <PersonalText>계획적인</PersonalText>
            </TextContainer>
            <TextContainer>
              <PersonalText>모험적인</PersonalText>
            </TextContainer>
            <TextContainer>
              <PersonalText>차량 선호</PersonalText>
            </TextContainer>
            <TextContainer>
              <PersonalText>사진 선호</PersonalText>
            </TextContainer>
        </HorizontalView>
        )}
      </View>

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

          <RoundedBackground>
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
          </RoundedBackground>
        </DetailPostContainer>
      </ScrollView>

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

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
`;

const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 25px;
`;

const ProfileImage = styled.Image`
    width: 42px;
    height: 42px;
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
  padding: 20px 25px;
`;

const Title = styled.Text`
  font-size: 19px;
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
  margin-top: 10px;
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

const RoundedBackground = styled.View`
  background-color: #F9F9F9;
  border-radius: 10px;
  padding: 10px 15px;
  margin-top: 10px;
`;

const HorizontalView = styled.View`
  flex-direction: row;
  margin: 15px 25px 0px;
  flex-wrap: wrap; 
  align-items: flex-start;
`;

const TextContainer = styled.View`
  background-color:  #F9F9F9;
  border-radius: 30px;
  margin-right: 7px;
  margin-bottom: 10px;
`;

const PersonalText = styled.Text`
  padding: 10px 15px;
  font-size: 12.5px;
`;