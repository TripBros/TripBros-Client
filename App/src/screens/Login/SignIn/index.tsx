import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { AxiosResponse } from 'axios';

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
import { useRecoilState,useSetRecoilState } from 'recoil';
import { userLoginState,userTokenState } from '../../../libs/Recoil/authState';
import { SignInFormProps } from './types';
import {
    setUserId,
    setPassword
  } from './Utils/SignInFormUtils';
import axios from 'axios';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import { SERVER_BASE_URL } from '../../../utils/constants';

interface LoginResponse {
    success: boolean;
    data : {
        "grantType": string,
        "accessToken" : string,
        // "refreshToken" : string,
    },
  }

const SignIn: React.FC = () => {
    //네비게이터
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // 로그인 폼 
    const [SignInForm, setSignInForm] = useState<SignInFormProps>({
        email: '',
        password: '',
    }); 
    const [userLogin,setUserLogin] = useRecoilState(userLoginState);
    const setUserToken = useSetRecoilState(userTokenState);

    // 에러 처리
    const [idError, setIdError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // 로그인 통신
    const loginfn = async (data: SignInFormProps) => {
        try {
          const response = await axios.post<SignInFormProps, AxiosResponse<LoginResponse>>(`${SERVER_BASE_URL}/api/user/sign-in`, data);
          
          if (response.data.success) {
              console.log('Response:', response);
              setUserLogin(true);
              setUserToken(response.data.data);
              Alert.alert('로그인 성공');
              navigation.navigate('Main');
          } else {
              Alert.alert('로그인 실패');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('로그인 과정에서 오류가 발생했습니다.');
        }
      };

    const handleLogin = () => {
        let isValid = true;

        // 아이디 유효성 검사
        if (!SignInForm.email) {
            setIdError('아이디를 입력해주세요.');
            isValid = false;
        } else if (!idRegex.test(SignInForm.email)) {
            setIdError('유효하지 않은 계정입니다.');
            isValid = false;
        } else {
            setIdError(''); // 에러 메시지 초기화
        }

        // 비밀번호 유효성 검사
        if (!SignInForm.password) {
            setPasswordError('비밀번호를 입력해주세요.');
            isValid = false;
        } else if (!passwordRegex.test(SignInForm.password)) {
            setPasswordError('유효하지 않은 비밀번호입니다.');
            isValid = false;
        } else {
            setPasswordError(''); // 에러 메시지 초기화
        }

        // 모든 유효성 검사 통과
        if (isValid) {
            // 서버 통신
            console.log(userLogin, '로그인 전 상태');
            loginfn(SignInForm);
            console.log(SignInForm, '로그인 시도');
            console.log(userLogin, '로그인 후 상태');
            // 로그인 성공 시 메인 페이지로 이동
            if(userLogin === true){
                navigation.navigate('Main');
            }
        }
    }   
    
    useEffect(() => {
        console.log(SignInForm);
    }, [SignInForm]);

    return (
            <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
                <StackHeader title="로그인"/>
                <LoginBlock> 
                    <LoginLogo source={require('../../../assets/splashScreen.png')}/>
                    <LoginTitle>로그인하기</LoginTitle>
                    <FormLogin>
                        <InputUserId
                            placeholder="Email"
                            value={SignInForm.email}
                            onChangeText={(inputUserId:string) => setUserId(setSignInForm,inputUserId)} 
                        />
                        <FormFailedText>{idError}</FormFailedText>
                        <InputUserPassword
                            placeholder="Password"
                            value={SignInForm.password}
                            onChangeText={(inputUserPassword:string) => setPassword(setSignInForm,inputUserPassword)}
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
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <FormSignupButtonText>회원가입</FormSignupButtonText>
                                </TouchableOpacity>
                            </FormSignupText>
                        </FormSignup>
                </LoginBlock>
            </SafeAreaView>
    );
};

export default SignIn;






