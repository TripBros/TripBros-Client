import styled from 'styled-components/native';

const ChatContainer = styled.ScrollView`
    flex: 1;
    background-color: #ffffff;
`;

const BottomSheetControllerBox = styled.View`
    width: 100%;
    background-color: #ffffff;
    justify-content: flex-end;
    
`;
const BottomSheetContrller = styled.TouchableOpacity`
    width: 40%;
    height: 50px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-left: 10px;
`;

const BottomSheetControllerText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #000000;
    margin-right: 10px;
`;

const SelectConfirmedChatBox = styled.View`
    width: 100%;
    height: 50px;
    background-color: #ffffff;

`;

const SelectConfirmedChat = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    margin-left: 10px;
`;

const SelectConfirmedChatText = styled.Text`
    font-size: 16px;
    color: #000000;
    margin-left: 10px;
`;

const ChattingLogBox = styled.TouchableOpacity`
    width: 100%;
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

const ChattingLogImage = styled.Image` 
    width: 50px;
    height: 50px;
    background-color: #D9D9D9;
    border-radius: 50px;
`;

const ChattingContentBox = styled.View`
    background-color: #ffffff;
    flex: 1;
    margin-left: 15px;
`;

const ChattingNameandAgeBox = styled.View`
    flex-direction: row;
`;

const ChattingLogName = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000000;
`;

const ChattingLogAge = styled.Text`
    font-size: 16px;
    color: #749BC2;
    margin-left: 10px;
`;

const ChattingLogTimeandTextBox = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const ChattingLogTime = styled.Text`
    font-size: 16px;
    color: #9E9E9E;
`;

const ChattingLogText = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export {
    ChatContainer,
    BottomSheetControllerBox,
    BottomSheetContrller,
    BottomSheetControllerText,
    SelectConfirmedChatBox,
    SelectConfirmedChat,
    SelectConfirmedChatText,
    ChattingLogBox,
    ChattingLogImage,
    ChattingContentBox,
    ChattingNameandAgeBox,
    ChattingLogName,
    ChattingLogAge,
    ChattingLogTimeandTextBox,
    ChattingLogTime,
    ChattingLogText
}