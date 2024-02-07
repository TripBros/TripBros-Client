import styled from 'styled-components/native';
const MyPageContainer = styled.View`
    flex: 1;
    background-color: white;
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 25%;
    padding: 10px;
`;

const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-left: 20px;
`;

const ProfileTextContainer = styled.View`
    width: 100%;
    height: 100%;
    margin-left: 10px;
    justify-content: center;
    align-items: left;
`;

const ProfileName = styled.Text`
    font-size: 24px;
    font-weight: bold;
`;

const ProfileAgeandSex = styled.Text`
    margin-top: 5px;
    font-size: 15px;
    color: #749BC2;
`;

const ProfileTravelStyleContainerContainer = styled.View`
    margin-bottom: 5px;
`;

const ProfileTravelStyleContainer = styled.View`
    flex-direction: row;
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 5px;
`;

const ProfileTravelStyleTextContainer = styled.View`
    width: 25%;
    height: 40px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    background-color: #F6F4EB;
`;

const ProfileTravelStyleText = styled.Text`
    font-size: 14px;
`;

const ProfileModifyContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10%;
    padding: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #A6A6AA;
`;
const ProfileModifyButton = styled.TouchableOpacity`
    width: 90%;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #A6A6AA;
    align-items: center;
    justify-content: center;
`;

const ProfileModifyText = styled.Text`
    font-size: 15px;
    color: #A6A6AA;
`;

const MyPageMenuContainer = styled.View`
    align-items: center;
    margin-top: 10px;
`;

const ProfileSettingButton = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    margin-left: 60px;
    flex-direction: row;
    align-items: center;
`;

const ProfileSettingText = styled.Text`
    font-size: 16px;
    margin-left: 10px;
`;

export {
    MyPageContainer,
    ProfileContainer,
    ProfileImage,
    ProfileTextContainer,
    ProfileName,
    ProfileAgeandSex,
    ProfileTravelStyleContainerContainer,
    ProfileTravelStyleContainer,
    ProfileTravelStyleTextContainer,
    ProfileTravelStyleText,
    ProfileModifyContainer,
    ProfileModifyButton,
    ProfileModifyText,
    MyPageMenuContainer,
    ProfileSettingButton,
    ProfileSettingText,
}