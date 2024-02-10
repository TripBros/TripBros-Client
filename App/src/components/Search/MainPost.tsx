import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface PostData {
  title: string;
  content: string;
  dateOfWriting: string;
  country: string;
  city: string;
  profileImage: any;
  nickname: string;
  ageRange: string;
  sex: string;
  startDate: string;
  endDate: string;
  numberOfMember: number;
  numberOfChat: number;
  numberOfLike: number;
};

const MainPost: React.FC<{postData: PostData}> = ({ postData }) => {
  // 시간 계산 함수(한국은 UTC+9)
  const calculateTimeWrittenAgo = (dateOfWriting: string) => {
    //현재 시간을 UTC+9로 변환
    const now = new Date();
    const offset = 9 * 60 * 60 * 1000; //9 hours in milliseconds
    const nowUtcPlus9 = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 
                            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()) + offset;

    // dateOfWriting을 Date 객체로 변환하고, UTC+9로 변환
    const postDate = new Date(dateOfWriting);
    const postDateUtcPlus9 = Date.UTC(postDate.getUTCFullYear(), postDate.getUTCMonth(), postDate.getUTCDate(), 
                                  postDate.getUTCHours(), postDate.getUTCMinutes(), postDate.getUTCSeconds()) + offset;

    const difference = nowUtcPlus9 - postDateUtcPlus9;
  
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return '방금 전';
    }
  };

  //'MM.DD' 형식으로 문자열 생성
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
  };

  const TimeWrittenAgo = calculateTimeWrittenAgo(postData.dateOfWriting);
  const FormattedStartDate = formatDate(postData.startDate);
  const FormattedEndDate = formatDate(postData.endDate);

  return(
    <>
      <PostContainer>
        <PostHeader>
          <TextContainer>
            <CountryCityTtitle>{`${postData.country} ${postData.city}`}</CountryCityTtitle>
          </TextContainer>
          <TimeWrittenAgoText>{TimeWrittenAgo}</TimeWrittenAgoText>
        </PostHeader>
        <Title>{postData.title}</Title>
        <Content>
          {postData.content.length > 40 ? `${postData.content.substring(0, 40)}...` : postData.content}
        </Content>
        <Profile>
          <ProfileImage source={postData.profileImage} />
          <ProfileContent>{`${postData.nickname} / ${postData.ageRange} ${postData.sex}`}</ProfileContent>
        </Profile>
        <PostFooter>
          <Profile>
            <Feather name="calendar" size={20} color="black" />
            <DetailContent>{`${FormattedStartDate} - ${FormattedEndDate}`}</DetailContent>
          </Profile>
          <Profile>
            <Octicons name="person" size={19} color="black" />
            <DetailContent>{`${postData.numberOfMember}명`}</DetailContent>
          </Profile>
          <Profile>
            <Ionicons name="chatbox-outline" size={20} color="#749BC2" />
            <ChatText>{`${postData.numberOfChat}`}</ChatText>
            <AntDesign name="hearto" size={18} color="#FF6060" style={{ marginLeft: 8 }}/>
            <LikeText>{`${postData.numberOfLike}`}</LikeText>
          </Profile>
        </PostFooter>
      </PostContainer>
      <DivisionLine/>
    </>
  );
}
export default MainPost;

const PostContainer = styled.View`
  padding-horizontal: 28px;
  overflow: hidden;
`;

const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const TextContainer = styled.View`
  background-color: #91C8E4;
  border-radius: 30px;
`

const CountryCityTtitle = styled.Text`
  color: white;
  padding: 10px 15px;
  font-size: 12.5px;
  font-weight: 700;
`;

const TimeWrittenAgoText = styled.Text`
  font-size: 11px;
  color: #989898;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const Content = styled.Text`
  font-size: 13.5px;
  margin-top: 8px;
`;

const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const ProfileImage = styled.Image`
    width: 23px;
    height: 23px;
    border-radius: 50px;
    margin-right: 7px;
`;

const ProfileContent = styled.Text`
  font-size: 12.5px;
`;

const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DetailContent = styled.Text`
  font-size: 12.5px;
  margin-left: 4px;
`;

const ChatText = styled.Text`
  font-size: 12.5px;
  margin-left: 4px;
  color: #749BC2;
`;

const LikeText = styled.Text`
  font-size: 12.5px;
  margin-left: 4px;
  color: #FF6060;
`;

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 20px;
    margin-bottom: 20px;
`;