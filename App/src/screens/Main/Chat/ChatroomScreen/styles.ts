import styled from 'styled-components/native';

const ChatroomContainer = styled.View`
  background-color: #ffffff;
  flex-direction: row;
  justify-content: space-evenly;
  border-bottom-width: 1px;
  border-color: #dedede;
`;

const ChatroomInfoContainer = styled.View`
  background-color: #ffffff;
`;

const ChatroomTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
`;
const ChatroomInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f6f4eb;
  border-radius: 10px;
`;

const ChatroomInfoTextBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const ChatroomInfoText = styled.Text`
  font-size: 16px;
`;

const ChatroomInfoAlert = styled.Text`
  font-size: 13px;
  margin: 10px;
  color: #c4c4c4;
`;

const ChatroomPlanButtonBox = styled.View`
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ChatroomPlanButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: #91c8e4;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ChattingContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (props.sender === props.client ? 'flex-end' : 'flex-start')};
  margin: 10px;
`;

const MessageBox = styled.View`
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.sender === props.client ? '#91C8E4' : '#F2F2F2')};
`;

const ChatText = styled.Text`
  color: ${(props) => (props.sender === props.client ? '#fff' : '#000')};
`;

const TimeTextBox = styled.View`

  bottom: 0;
`;
const TimeText = styled.Text`
  font-size: 12px;
  color: #9E9E9E;
  margin: 5px;
`;

const InputChattingBox = styled.View`
  position: absolute;
  width: 100%;
  bottom: 30px;
  background-color: #ffffff;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
`;

const InputChatting = styled.TextInput`
  width: 80%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  background-color: #f2f2f2;
  border-radius: 20px;
  padding: 10px;
`;

const SendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export {
    ChatroomContainer,
    ChatroomInfoContainer,
    ChatroomTitle,
    ChatroomInfo,
    ChatroomInfoTextBox,
    ChatroomInfoText,
    ChatroomInfoAlert,
    ChatroomPlanButtonBox,
    ChatroomPlanButton,
    ChattingContainer,
    MessageContainer,
    MessageBox,
    ChatText,
    TimeTextBox,
    TimeText,
    InputChattingBox,
    InputChatting,
    SendButton,
}
