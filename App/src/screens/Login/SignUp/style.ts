import styled from 'styled-components/native';
import { ScrollView} from 'react-native';

interface SexCheckButtonProps {
    active: boolean;
}

interface TravelStyleCheckBoxProps {
    active: boolean;
}

const contentStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
const SignupBlock = styled(ScrollView).attrs({
    contentContainerStyle: contentStyles,
  })`
    flex: 1;
    background-color: #fff;
  `;
const SignupForm = styled.View`
    width: 95%;
    height: 100%;
    padding: 20px;
    justifyContent: 'center';
    alignItems: 'center';
`;

const SignupText = styled.Text`
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const ProfileImageBox = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
`;
const ProfileImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 20px;
`;

const ProfileImageInputButtun = styled.TouchableOpacity`
    width: 140px;
    height: 33px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid #A6A6A6;
    align-items: center;
    justify-content: center;
`;


const InputUser = styled.TextInput`
    width: 100%;
    height: 40px;
    font-size: 14px;
    padding: 0 10px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
`;

const InputUserIdandNickNameBox = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const InputUserIdAndNickName = styled.TextInput`
    width: 70%;
    height: 40px;
    font-size: 14px;
    padding: 0 10px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    background-color: #FFFFFF; 
`;
const CheckButton = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    margin-left : 10px;
    margin-bottom: 10px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
`;

const YearChooseBox = styled.View`
    width: 100%;
    z-index: 10;
`;

const ChooserSexBox = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 10px;
`;

const SexCheckButton = styled.TouchableOpacity<SexCheckButtonProps>`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    margin-left : 10px;
    margin-bottom: 10px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? '#749BC2' : 'white'};
`;

const FormButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #91C8E4;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    /* iOS 그림자 스타일 */
    shadow-color: #000;
    shadow-offset: 2px 2px;
    shadow-opacity: 0.3;
    shadow-radius: 4.65px;

    /* Android 그림자 스타일 */
    elevation: 8;
`;
const FormSignupText = styled.Text`
  font-size: 20px; 
  font-weight: bold;
  color: #fff;
  
`;

const TravelStyleBlock = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;
const TravelStyleCheckBox = styled.TouchableOpacity`
    width: 48%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid  ${props => props.active ? '#749BC2' : '#D8D8D8'};
    align-items: center;
    justify-content: center;
`;

const AgreementBlock = styled.View`
    width: 100%;
    margin: 10px;
    
`;

const AgreementBox = styled.View`  
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const AgreementButton = styled.TouchableOpacity`
    width: 50px;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
`;
const AgreementText = styled.Text`
    font-size: 14px;
    color: #000;
    margin-right: 5px;
`;

export {
    SignupBlock,
    SignupForm,
    SignupText,
    ProfileImageBox,
    ProfileImage,
    ProfileImageInputButtun,
    InputUser,
    InputUserIdAndNickName,
    InputUserIdandNickNameBox,
    CheckButton,
    YearChooseBox,
    ChooserSexBox,
    SexCheckButton,
    FormButton,
    FormSignupText,
    TravelStyleBlock,
    TravelStyleCheckBox,
    AgreementBlock,
    AgreementBox,
    AgreementText,
    AgreementButton,

}