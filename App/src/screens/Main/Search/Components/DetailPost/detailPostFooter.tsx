import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';

interface DetailPostFooterProps {
  likes: number;
  isLiked: boolean;
  handleLikePress: () => void;
}

const DetailPostFooter:React.FC<DetailPostFooterProps> = ({ likes, isLiked, handleLikePress }) => {
  const [isAuthor, setIsAuthor] = useState(false);

  return(
    <FooterContainer>
        <LikeContainer onPress={handleLikePress} disabled={isAuthor}>
          <AntDesign name={isLiked ? "heart" : "hearto"} size={19} color={isAuthor ? "grey" : "red"}/>
          <LikeText>{likes}</LikeText>
        </LikeContainer>
        <ChatButtonContainer onPress={() => {}}>
        {
          isAuthor ? (
            <ChatStartText>모집 마감하기</ChatStartText>
          ) : (
            <ChatStartText>1:1 채팅 시작하기</ChatStartText>
          )
        }
        </ChatButtonContainer>
    </FooterContainer>
  );
}
export default DetailPostFooter;

const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const LikeContainer = styled.TouchableOpacity`
  flex-direction: row;
  margin: 0px 30px;
`;

const LikeText = styled.Text`
  margin-left: 5px;
`;

const ChatButtonContainer = styled.TouchableOpacity`
  background-color: #91C8E4;
  border-radius: 5px;
  flex: 1;
  margin-right: 30px;
`

const ChatStartText = styled.Text`
  color: white;
  padding: 15px;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;