import styled from 'styled-components/native';

const LoginBlock = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
`;

const LoginLogo = styled.Image`
    width: 230px;
    height: 120px;
    margin: 60px 0 60px 0;
    `;

const LoginTitle = styled.Text`
    width: 100%;
     font-size: 29px; 
     font-weight: bold;
     color: #91C8E4;
     margin-left: 90px;
     margin-bottom: 10px;
    text-align: left;
`;

const FormLogin = styled.View`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const InputUserId = styled.TextInput`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  padding: 0 10px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  background-color: #FFFFFF; 

`;

const InputUserPassword = styled.TextInput`
    width: 100%;
    height: 40px;
    font-size: 24px;
    padding: 0 10px;
    font-weight: bold;
    border-bottom-width: 1px;
    margin-bottom: 20px;
    background-color: #FFFFFF;
    `;

const FormButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #749BC2;
    border-radius: 5px;
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

const FormLoginText = styled.Text`
  font-size: 20px; 
  font-weight: bold;
  color: #fff;


`;
const FormFailedText = styled.Text`
    font-size: 14px;
    text-align: center;
    color: #FF0000;
    font-weight:bold;
`;

const FormSignup = styled.View`
    width: 100%;
    align-items: center;
`;

const FormSignupText = styled.Text`
    font-size: 14px;
    text-align: center;
    margin:20px;
`;
const FormSignupButtonText = styled.Text`
    font-size: 14px;
    text-align: center;
    color: #749BC2;
    font-weight: bold;
    margin-left: 5px;
`;



export {
    LoginLogo,
    LoginTitle,
    LoginBlock,
    InputUserId,
    InputUserPassword,
    FormSignup,
    FormSignupText,
    FormSignupButtonText,
    FormLoginText,
    FormFailedText,
    FormLogin,
    FormButton,
};
