import styled from 'styled-components/native';
import { ScrollView} from 'react-native';

const contentStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
const LikePostsContainer = styled(ScrollView).attrs({
    contentContainerStyle: contentStyles,
  })`
    flex: 1;
    background-color: #fff;
  `;

  const PostCard = styled.TouchableOpacity`
    width: 100%;;
    `;

const PostContentBox = styled.View`
    padding: 10px 25px;
    border-bottom-width: 1px;
    border-bottom-color: #DEDEDE;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Content = styled.Text`
    font-size: 16px;
    margin-bottom: 10px;
`;

const EtcBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const HowManyChat = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ChatNum= styled.Text`
    margin-left: 5px;
    color: #749BC2;
`;
const HowManyLike = styled.View`
    margin-left: 10px;
    flex-direction: row;
    align-items: center;
`;
const LikeNum = styled.Text`
    margin-left: 5px;
    color: #FF2F2F;
`;

export {
    LikePostsContainer,
    PostCard,
    PostContentBox,
    Title,
    Content,
    EtcBox,
    HowManyChat,
    ChatNum,
    HowManyLike,
    LikeNum,
};