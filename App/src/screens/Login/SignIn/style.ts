import styled from 'styled-components/native';
const LoginHeader = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #749BC2;
    shadow-color: #000;
    
`;

const LoginBlock = styled.View`
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #FFFFFF;
`;

const LoginLogo = styled.Image`
    width: 230;
    height: 120;
    margin: 40px 0 60px 0;
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
  height: 40;
  font-size: 24px;
  font-weight: bold;
  padding: 0 10px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  background-color: #FFFFFF; 

`;

const InputUserPassword = styled.TextInput`
    width: 100%;
    height: 40;
    font-size: 24px;
    padding: 0 10px;
    font-weight: bold;
    border-bottom-width: 1px;
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
`;

const FormLoginText = styled.Text`
  font-size: 20x; 
  font-weight: bold;
  color: #fff;

`;

const FormSignup = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const FormSignupText = styled.Text`
    font-size: 14px;
    text-align: center;
`;

const FormFailedText = styled.Text`
  font-size: 10px;
  text-align: center;
`;

export {
    LoginLogo,
    LoginHeader,
    LoginTitle,
    LoginBlock,
    InputUserId,
    InputUserPassword,
    FormSignupText,
    FormLoginText,
    FormFailedText,
    FormLogin,
    FormButton,
};
