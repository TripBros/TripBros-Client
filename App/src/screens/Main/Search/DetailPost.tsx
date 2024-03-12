import React, { useState } from 'react';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Linking, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { SimpleLineIcons } from '@expo/vector-icons';

import { calculateTimeWrittenAgo } from '../../../utils/timeUtils';
import DetailPostHeader from './Components/DetailPost/detailPostHeader';
import TripInformation from './Components/DetailPost/tripInformation';
import DetailPostFooter from './Components/DetailPost/detailPostFooter';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

type DetailPostRouteProp = RouteProp<RootStackParamList, 'DetailPost'>;

interface DetailPostProps {
  route: DetailPostRouteProp;
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startYear = start.getFullYear().toString();
  const startMonth = (start.getMonth() + 1).toString().padStart(2, '0');
  const startDay = start.getDate().toString().padStart(2, '0');

  const endYear = end.getFullYear().toString();
  const endMonth = (end.getMonth() + 1).toString().padStart(2, '0');
  const endDay = end.getDate().toString().padStart(2, '0');

  // 날짜가 같은 경우
  if (startDate === endDate) {
    return `${startYear}.${startMonth}.${startDay}`;
  }

  // 연도가 같은 경우
  const formattedStartDate = `${startYear}.${startMonth}.${startDay}`;
  let formattedEndDate = `${endMonth}.${endDay}`;

  // 연도가 다른 경우 endDate에 연도 포함
  if (startYear !== endYear) {
    formattedEndDate = `${endYear}.${formattedEndDate}`;
  }

  return `${formattedStartDate} - ${formattedEndDate}`;
}

const DetailPost: React.FC<DetailPostProps> = ({ route }) => {
  const { postData } = route.params;

  const TimeWrittenAgo = calculateTimeWrittenAgo(postData.createdAt);
  const formattedDateRange = formatDateRange(postData.startDate, postData.endDate);

  const [likes, setLikes] = useState(postData.bookmarkCount);
  const [isLiked, setIsLiked] = useState(postData.isBookmarked); //사용자의 좋아요 여부

  const placeUrl = `https://www.google.com/maps/place/?q=place_id:${postData.placeId}`;

  const handlePlacePress = async () => {
    try {
      await Linking.openURL(placeUrl);
    } catch (err) {
      console.error("Couldn't load page", err);
    }
  };

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
        <DetailPostHeader postData={postData}/>

      <ScrollView>
      <View>
        <ProfileContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ProfileImage source={postData.profileImage}/>
            <View>
              <NameText>{postData.nickname}</NameText>
              <Text style={{ fontSize: 12 }}>{`${postData.age} ${postData.sex}`}</Text>
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
            <PurposeAndTimeContainer>
              <PurposeText>{`# ${postData.purpose}`}</PurposeText>
              <TimeWrittenAgoText>{TimeWrittenAgo}</TimeWrittenAgoText>
            </PurposeAndTimeContainer>

            <DivisionLine/>
            <ContentContainer>
              <Content>{postData.content}</Content>
            </ContentContainer>

            {postData.placeLatitude !== undefined && postData.placeLongitude !== undefined && (
              <>
              <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 3 }}>장소</Text>
                <TouchableOpacity onPress={handlePlacePress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                  <Text style={{ fontSize: 13, marginRight: 6 }}>{postData.placeName}</Text>
                  <SimpleLineIcons name="arrow-right" size={16} color="black" />
                </View>
                </TouchableOpacity>
              <MapView 
              provider={PROVIDER_GOOGLE}
              style={{ width: '100%', height: 150, marginVertical: 10, borderRadius: 5 }}
              initialRegion={{
                latitude: postData.placeLatitude,
                longitude: postData.placeLongitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421, 
              }}>
              <Marker
                coordinate={{ latitude: postData.placeLatitude, longitude: postData.placeLongitude }}
                pinColor="#2D63E2"/>
              </MapView>
              </>
            )}

            <RowContainer>
              <ChatViewText>{`채팅 ${postData.chatCount}`}</ChatViewText>
              <ChatViewText style={{ marginLeft: 10 }}>{`조회 ${postData.hit}`}</ChatViewText>
            </RowContainer>

            <TripInformation postData={postData} formattedDateRange={formattedDateRange} />
        </DetailPostContainer>
      </ScrollView>

        <DetailPostFooter 
          likes={likes}
          isLiked={isLiked}
          handleLikePress={handleLikePress}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default DetailPost;

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

const DetailPostContainer = styled.View`
  padding: 20px 25px;
`;

const Title = styled.Text`
  font-size: 19px;
  font-weight: bold;
`;

const PurposeAndTimeContainer = styled.View`
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
  padding-top: 20px;
  padding-bottom: 7px;
`;

const ChatViewText = styled.Text`
  font-size: 12.5px;
  color: grey;
`;

const HorizontalView = styled.View`
  flex-direction: row;
  margin: 15px 25px 0px;
  flex-wrap: wrap; 
  align-items: flex-start;
`;

const TextContainer = styled.View`
  background-color:  #F1F1F1;
  border-radius: 30px;
  margin-right: 7px;
  margin-bottom: 10px;
`;

const PersonalText = styled.Text`
  padding: 10px 15px;
  font-size: 12.5px;
`;