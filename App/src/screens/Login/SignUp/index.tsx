import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../../components/Header/stackHeader';
import { idRegex,passwordRegex,nameRegex } from '../../../utils/validate/signup';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
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
    IsValidationState,
    Year
    } from './types';
import {
    setIsId,
    setIsPassword,
    setIsPasswordConfirm,
    setIsNickname,
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

const SignUp: React.FC = () => {
    const navigator = useNavigation();
    // 회원가입 폼 상태
    const [formData, setFormData] = useState<SignUpFormState>({
        profileImage: null,
      userId: '',
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
    const [isValidate, setIsValidate] = useState<IsValidationState>({
        isId: false,
        isPassword: false,
        isPasswordConfirm: false,
        isNickname: false,
        isBirth: false,
    });

    //출생년도 선택을 위한 상태
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date().getFullYear());
    const [items, setItems] = useState<Year[]>([]);

    //회원가입 동의
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    //회원가입 버튼
    const handleSignUp = () => {
        const isSuccessful:boolean = false;
        //회원가입 요청
        const submitSignUp = async () => {
            try {
              const postData = {
                EMAIL : formData.userId,
                password : formData.password,
                nickname : formData.nickname,
                age : formData.birth,
                sex : formData.sex,
                leisurely_flag : formData.leisurely_flag,
                planner_flag : formData.planner_flag,
                adventurous_flag : formData.adventurous_flag,
                vehicle_travel_flag : formData.vehicle_travel_flag,
                photo_preference_flag : formData.photo_preference_flag,
                profile_image : formData.profileImage,
              };
          
              const response = await axios.post('회원가입 요청주소', postData);
          
              if (response.data.success) {
                // 회원가입 성공 처리
                console.log('회원가입 성공:', response.data);
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
        if (!isValidate.isId) {
            isPerfect = false;
            Alert.alert('아이디를 확인해주세요.');
            return;
        }

        checkPassword(formData.password);
        checkPasswordConfirm(formData.password,passwordCheck);

        if (!isValidate.isPassword) {
            isPerfect = false;
            return;
        }
        if (!isValidate.isPasswordConfirm) {
            isPerfect = false;
            return;
        }

        if (!isValidate.isBirth) {
            isPerfect = false;
            Alert.alert('출생년도를 확인해주세요.');
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
            navigator.navigate('SignIn');
        }
    }
 
    const checkPassword = (password:string) => {
            //비밀번호 유효성 검사 (8~16자, 영문, 숫자, 특수문자)
            if (password === '') {
                setIsPassword(setIsValidate,false);
                Alert.alert('비밀번호를 입력해주세요.')
                return;
            } else if (!passwordRegex.test(password)) {
                setIsPassword(setIsValidate,false);
                Alert.alert('유효하지 않은 비밀번호입니다.')
                return;
            } else if (password.length < 8 || password.length > 16) {
                setIsPassword(setIsValidate,false);
                Alert.alert('비밀번호는 8~16자리로 입력해주세요.')
                return;
            }
            setIsPassword(setIsValidate,true);
        }

    const checkPasswordConfirm = (password:string,passwordCheck:string) => {
            //비밀번호 확인
            if (passwordCheck === '') {
                setIsPasswordConfirm(setIsValidate,false);
                Alert.alert('비밀번호를 입력해주세요.')
                return;
            } else if (password !== passwordCheck) {
                setIsPasswordConfirm(setIsValidate,false);
                Alert.alert('비밀번호가 일치하지 않습니다.')
                return;
            }
            setIsPasswordConfirm(setIsValidate,true);
        }
    const checkIdDuplicate = async(userId:string) => {
            //아이디 유효성 검사 (이메일 형식)
            if (userId === '') {
                setIsId(setIsValidate,false);
                Alert.alert('아이디를 입력해주세요.')
                return;
            } else if (!idRegex.test(userId)) {
                setIsId(setIsValidate,false);
                Alert.alert('유효하지 않은 계정입니다.')
                return;
            }
            //아이디 중복검사
            try {
                const response = await axios.post('서버주소', userId);
                // response.data를 사용하여 중복 여부를 확인하고 처리
                if (response.data.success) {
                  // 아이디 사용 가능
                  setIsId(setIsValidate,true);
                } else {
                  // 아이디 중복
                    setIsId(setIsValidate,false);
                    Alert.alert('이미 사용중인 아이디입니다.');
                }
              } catch (error) {
                console.error('중복 체크 중 오류 발생:', error);
              }
        }
    
    const checkNicknameDuplicate = async(nickname:string) => {
            //닉네임 유효성 검사 (2~10자)
            if (nickname === '') {
                setIsNickname(setIsValidate,false);
                Alert.alert('닉네임을 입력해주세요.')
                return;
            } else if (!nameRegex.test(nickname)) {
                setIsNickname(setIsValidate,false);
                Alert.alert('유효하지 않은 닉네임입니다.')
                return;
            } else if (nickname.length < 2 || nickname.length > 10) {
                setIsNickname(setIsValidate,false);
                Alert.alert('닉네임은 2~10자리로 입력해주세요.')
                return;
            }

            try {
                const response = await axios.post('서버주소', nickname);
                // response.data를 사용하여 중복 여부를 확인하고 처리
                if (response.data.success) {
                  // 닉네임 사용 가능
                  setIsNickname(setIsValidate,true);
                } else {
                  // 닉네임 중복
                    setIsNickname(setIsValidate,false);
                    Alert.alert('이미 사용중인 닉네임입니다.');
                }
              }catch (error) {
                console.error('중복 체크 중 오류 발생:', error);
        }
    }
    // 잘되나 확인용       
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="회원가입"/>
            <SignupBlock>
                <SignupForm>
                    <InputUserProfileImage profileImage={formData.profileImage} setFormData={setFormData}/>
                    <InputUserId userId={formData.userId} setFormData={setFormData} checkIdDuplicate={checkIdDuplicate}/>
                    <InputUserPassword password={formData.password} setFormData={setFormData}/>
                    <SignupText>비밀번호 확인</SignupText>
                    <InputUser
                        placeholder="비밀번호 확인"
                        value={passwordCheck}
                        onChangeText={setPasswordCheck} />
                    <InputUserNickName nickname={formData.nickname} setFormData={setFormData} checkNicknameDuplicate={checkNicknameDuplicate}/>
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