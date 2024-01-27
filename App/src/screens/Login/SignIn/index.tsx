import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
    LoginLogo,
    FormButton,
    FormLogin,
    FormLoginText,
    FormSignup,
    FormSignupText,
    FormSignupButtonText,
    InputUserId,
    InputUserPassword,
    LoginBlock,
    LoginTitle,
    FormFailedText,
  } from './style';
import StackHeader from '../../../components/Header/stackHeader';
import { idRegex,passwordRegex } from '../../../utils/validate/signin';
import { useSetRecoilState } from 'recoil';
import { userLoginState } from '../../../libs/Recoil/authState';

const SignIn: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const setLogin = useSetRecoilState(userLoginState);

    // 에러 처리
    const [idError, setIdError] = useState<String>('');
    const [passwordError, setPasswordError] = useState<String>('');

    //네비게이터
    const navigator = useNavigation();

    const handleLogin = () => {
        let isValid = true;

        // 아이디 유효성 검사
        if (!userId) {
            setIdError('아이디를 입력해주세요.');
            isValid = false;
        } else if (!idRegex.test(userId)) {
            setIdError('유효하지 않은 계정입니다.');
            isValid = false;
        } else {
            setIdError(''); // 에러 메시지 초기화
        }

        // 비밀번호 유효성 검사
        if (!password) {
            setPasswordError('비밀번호를 입력해주세요.');
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError('유효하지 않은 비밀번호입니다.');
            isValid = false;
        } else {
            setPasswordError(''); // 에러 메시지 초기화
        }

        // 모든 유효성 검사 통과
        if (isValid) {
            // 로그인 처리,여기에 API 요청 로직을 구현
            // 로그인 성공시 토큰 저장하고, setLogin(true)로 변경하고 navigator.navigate('Main')으로 이동
            Alert.alert('로그인 시도', `Username: ${userId}, Password: ${password}`);
          }   

    };

    return (
            <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
                <StackHeader title="로그인"/>
                <LoginBlock> 
                    <LoginLogo source={require('../../../assets/splashScreen.png')}/>
                    <LoginTitle>로그인하기</LoginTitle>
                    <FormLogin>
                        <InputUserId
                            placeholder="Email"
                            value={userId}
                            onChangeText={setUserId} 
                        />
                        <FormFailedText>{idError}</FormFailedText>
                        <InputUserPassword
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <FormFailedText>{passwordError}</FormFailedText>
                        <FormButton
                            title="로그인"
                            onPress={handleLogin}
                        >
                            <FormLoginText>로그인하기</FormLoginText>
                        </FormButton>
                        </FormLogin>
                        <FormSignup>
                            <FormSignupText>
                                아직 회원이 아니신가요?
                                <TouchableOpacity onPress={() => navigator.navigate('SignUp')}>
                                    <FormSignupButtonText>회원가입</FormSignupButtonText>
                                </TouchableOpacity>
                            </FormSignupText>
                        </FormSignup>
                </LoginBlock>
            </SafeAreaView>
    );
};

export default SignIn;






