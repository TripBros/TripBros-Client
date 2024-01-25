import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ArrowBackIcon from '../../../assets/StackNav/ArrowBack.svg';
import styled from 'styled-components/native';
import {
    LoginLogo,
    LoginHeader,
    FormButton,
    FormLogin,
    FormLoginText,
    FormSignupText,
    InputUserId,
    InputUserPassword,
    LoginBlock,
    LoginTitle,
  } from './style';

const SignIn: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigation();

    const handleLogin = () => {
        // 여기에 API 요청 로직을 구현하세요
        // 예: axios.post('https://your-api.com/login', { username, password })
        Alert.alert('로그인 시도', `Username: ${userId}, Password: ${password}`);
    };

    return (
            <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
                <LoginHeader>
                    <TouchableOpacity
                        style={{width: 24, height: 24}}
                        onPress={() => navigator.goBack()
                        }>
                    {/* <ArrowBackIcon/> */}
                    </TouchableOpacity>
                    <Text style={{fontSize: 20,color: '#fff', fontWeight: 'bold'}}>로그인</Text>
                    <View style={{width: 24, height: 24}}></View>{/* 빈 요소로 균형을 맞추기 위함 */}
                </LoginHeader>
                
                <LoginBlock> 
                    <LoginLogo source={require('../../../assets/splashScreen.png')}/>
                    <LoginTitle>로그인하기</LoginTitle>
                    <FormLogin>
                        <InputUserId
                            placeholder="Email or ID"
                            value={userId}
                            onChangeText={setUserId} 
                        />
                        <InputUserPassword
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <FormButton
                            title="로그인"
                            onPress={handleLogin}
                        >
                            <FormLoginText>로그인하기</FormLoginText>
                        </FormButton>
                        </FormLogin>
                        <FormSignupText>아직 회원이 아니신가요?</FormSignupText>
                        <Button 
                            title="회원가입" 
                            onPress={() => navigator.navigate('SignUp')}
                            style = {{fontColor : '#FF8682'}}
                            > 회원가입 
                            </Button>
                </LoginBlock>
            </SafeAreaView>
    );
};

export default SignIn;






