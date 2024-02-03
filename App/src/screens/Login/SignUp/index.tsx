import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../../components/Header/stackHeader';
import { idRegex,passwordRegex,nameRegex } from '../../../utils/validate/signup';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigators/RootNavigator';
import {   
    SignupBlock,
    SignupForm,
    SignupText,
    ProfileImageBox,
    ProfileImage,
    ProfileImageInputButtun,
    InputUserIdandNickNameBox,
    InputUserIdAndNickName,
    CheckButton,
    InputUser,
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
    } from './style';

import {  
    SignUpFormState,
    isValidationProps,
    Year
    } from './types';

import {
    checkPassword,
    checkPasswordConfirm,
    checkIdDuplicate,
    checkNicknameDuplicate,
    } from './utils/isVaildateUtils';
import { formDataState } from '../../../libs/Recoil/userInfo';
import {InputUserId} from './components/inputUserId';
import {InputUserPassword} from './components/inputPassword';
import {InputUserNickName} from './components/inputUserNickname';
import {InputUserBirth} from './components/inputUserBirth';
import {InputUserSex} from './components/inputUserSex';
import {InputUserTravelStyle} from './components/inputUserTravelStyle';
import { CheckAgree } from './components/checkAgree';
import { InputUserProfileImage } from './components/inputUserProfileImage';
import { isValidationState } from '../../../libs/Recoil/signupValid';
import {SERVER_BASE_URL} from '../../../utils/constants';

const SignUp: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // 회원가입 폼 상태
    const [formData, setFormData] = useState<SignUpFormState>({
        profileImage: null,
        email: '',
        password: '',
        nickname: '',
        birth: 0,
        sex: 'man',
        leisurely_flag: true,
        planner_flag: true,
        adventurous_flag: true,
        vehicle_travel_flag: true,
        photo_preference_flag: true,
    });
    const [passwordCheck, setPasswordCheck] = useState<string>('');

    //유효성검사
    const [isValidate, setIsValidate] = useRecoilState<isValidationProps>(isValidationState);

    //회원가입 동의
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    //회원가입 버튼
    const handleSignUp = () => {
        let isSuccessful:boolean = false;
        //회원가입 요청
        const submitSignUp = async () => {
            try {
              const response = await axios.post(`${SERVER_BASE_URL}/api/user/register`, formData);
          
              if (response.data.success) {
                // 회원가입 성공 처리
                console.log('회원가입 성공:', response.data);
                isSuccessful = true;
              } else {
                // 회원가입 실패 처리
                console.error('회원가입 실패:', response.data.message);
              }
            } catch (error) {
              // HTTP 요청 실패 또는 서버 에러 처리
              console.error('서버 요청 실패:', error);
            }
          };

        //회원가입 유효성 검사
        let isPerfect:boolean = true;
        //1 동의했는지
        if (!agreeTerms || !agreePrivacy) {
            isPerfect = false;
            Alert.alert('약관에 동의해주세요.');
            return;
        }

        //2 유효성 검사
        if (!isValidate.isEmail) {
            isPerfect = false;
            Alert.alert('아이디를 확인해주세요.');
            return;
        }

        checkPassword(formData.password,setIsValidate);
        checkPasswordConfirm(formData.password,passwordCheck,setIsValidate);

        if (!isValidate.isPassword) {
            isPerfect = false;
            return;
        }
        if (!isValidate.isPasswordConfirm) {
            isPerfect = false;
            return;
        }

        if (!isValidate.isNickname) {
            isPerfect = false;
            Alert.alert('닉네임을 확인해주세요.');
            return;
        }

        //3 서버에 회원가입 요청
        if (isPerfect) {
            submitSignUp();
        }

        //4 성공시 로그인 페이지로 이동
        if(isSuccessful){
            Alert.alert('회원가입이 완료되었습니다.');
            navigation.navigate('SignIn');
        }
    };
  
    const handleCheckIdDuplicate = (email:string) => {
        checkIdDuplicate(email, setIsValidate);
      };
    
    const handleCheckNicknameDuplicate = (nickname:string) => {
        checkNicknameDuplicate(nickname, setIsValidate);
      };

    // 잘되나 확인용  
    useEffect(() => {
        console.log(formData);
        console.log(isValidate);
        console.log(agreeTerms);
        console.log(agreePrivacy);
    }, [formData,agreePrivacy,agreeTerms]);

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="회원가입"/>
            <SignupBlock>
                <SignupForm>
                    <InputUserProfileImage profileImage={formData.profileImage} setFormData={setFormData}/>
                    <InputUserId email={formData.email} setFormData={setFormData} checkIdDuplicate={handleCheckIdDuplicate}/>
                    <InputUserPassword password={formData.password} setFormData={setFormData}/>
                    <SignupText>비밀번호 확인</SignupText>
                    <InputUser
                        secureTextEntry={true}
                        placeholder="비밀번호 확인"
                        value={passwordCheck}
                        onChangeText={setPasswordCheck} />
                    <InputUserNickName nickname={formData.nickname} setFormData={setFormData} checkNicknameDuplicate={handleCheckNicknameDuplicate}/>
                    <SignupText>출생년도</SignupText>
                    <InputUserBirth setFormData={setFormData}/>
                    <InputUserSex sex={formData.sex}  setFormData={setFormData}/>
                    <InputUserTravelStyle
                        leisurely_flag={formData.leisurely_flag}
                        planner_flag={formData.planner_flag}
                        adventurous_flag={formData.adventurous_flag}
                        vehicle_travel_flag={formData.vehicle_travel_flag}
                        photo_preference_flag={formData.photo_preference_flag}
                        setFormData={setFormData}
                        />
                    <CheckAgree
                        agreeTerms={agreeTerms}
                        agreePrivacy={agreePrivacy}
                        setAgreeTerms={setAgreeTerms}
                        setAgreePrivacy={setAgreePrivacy}
                        />
                    <FormButton
                        title="회원가입"
                        onPress={handleSignUp}
                        >
                            <FormSignupText>트립브로스 시작하기</FormSignupText>
                    </FormButton>
                </SignupForm>
            </SignupBlock>
        </SafeAreaView>
    );
};

export default SignUp;