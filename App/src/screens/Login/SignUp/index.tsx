import React,{useState,useEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../../components/Header/stackHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import { CheckBox } from 'react-native-elements';

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
import * as ImagePicker from 'expo-image-picker';

interface Year {
    label: string;
    value: number;
  }

const SignUp: React.FC = () => {
    // 이미지, 아이디, 비밀번호, 닉네임, 생년월일, 성별, 여행스타일
    const [profileImage, setProfileImage] = useState<string|null>(null);
    const [userId, setUserId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [birth, setBirth] = useState<number>(0);
    const [sex, setSex] = useState<boolean>(true);
    const [travelStyle, setTravelStyle] = useState<boolean>(true);
    const [travelStyle2, setTravelStyle2] = useState<boolean>(true);

    
    //출생년도 선택을 위한 상태
    const currentYear = new Date().getFullYear();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(currentYear);
    const [items, setItems] = useState<Year[]>([]);

    //유효성검사
    const [isId, setIsId] = useState<boolean>(false);
    const [isPassword, setIsPassword] = useState<boolean>(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
    const [isNickname, setIsNickname] = useState<boolean>(false);

    //에러메세지
    const [idMessage, setIdMessage] = useState<string>("");
    const [passwordMessage, setPasswordMessage] = useState<string>("");
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>("");
    const [nicknameMessage, setNicknameMessage] = useState<string>("");
    const [isAgree, setIsAgree] = useState<boolean>(false);

    //회원가입 동의
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreePrivacy, setAgreePrivacy] = useState(false);

    const handleSignUp = () => {
        //1 동의했는지
        //2 유효성 검사
        //3 서버에 회원가입 요청
        //4 성공시 로그인 페이지로 이동
    }

    const uploadImage = async () => {
        // 사용자 권한 요청
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
        alert('사진 접근 권한이 필요합니다!');
        return;
          }
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
      
          if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            console.log(result.assets[0].uri,'이미지');
          }
        };
    const checkIdDuplicate = () => {
            //아이디 중복검사
            //서버에 아이디 중복검사 요청
            //중복이면 isId를 true로 변경
            //중복이 아니면 isId를 false로 변경
            //에러메세지를 띄워줌
        }
    
    const checkNicknameDuplicate = () => {
            //닉네임 중복검사
            //서버에 닉네임 중복검사 요청
            //중복이면 isNickname를 true로 변경
            //중복이 아니면 isNickname를 false로 변경
            //에러메세지를 띄워줌
        }
    
    const checkPasswordConfirm = () => {
            //비밀번호 확인
            //비밀번호와 비밀번호 확인이 같으면 isPasswordConfirm를 true로 변경
            //다르면 isPasswordConfirm를 false로 변경
            //에러메세지를 띄워줌
        }
        
    useEffect(() => {
        const options : Year[] = [];
        for (let year = currentYear; year >= currentYear - 100; year--) {
          options.push({ label: year.toString(), value: year });
        }
        setItems(options);
      }, []);

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="회원가입"/>
            <SignupBlock>
                <SignupForm>
                    <SignupText>프로필 사진</SignupText>
                    <ProfileImageBox  >
                    <ProfileImage source={{uri: profileImage} || '기본이미지 uri'}/>
                        <ProfileImageInputButtun onPress={uploadImage}>
                            <Text style={{color:'#A6A6A6'}}>프로필 사진 등록</Text>
                        </ProfileImageInputButtun>
                    </ProfileImageBox>
                    <SignupText>아이디(이메일)</SignupText>
                    <InputUserIdandNickNameBox>
                    <InputUserIdAndNickName
                        placeholder="Email"
                        value={userId}
                        onChangeText={setUserId} />
                    <CheckButton>
                        <Text style={{color: "#749BC2"}}>중복확인</Text>
                    </CheckButton>
                    </InputUserIdandNickNameBox>
                    <SignupText>비밀번호</SignupText>
                    <InputUser
                        placeholder="영문,숫자,특수문자 포함 8자리 이상"
                        value={password}
                        onChangeText={setPassword} />
                    <SignupText>비밀번호 확인</SignupText>
                    <InputUser
                        placeholder="비밀번호 확인"
                        value={passwordCheck}
                        onChangeText={setPasswordCheck} />
                    <SignupText>닉네임</SignupText>
                    <InputUserIdandNickNameBox>
                        <InputUserIdAndNickName
                            placeholder="닉네임"
                            value={nickname}
                            onChangeText={setNickname} />
                        <CheckButton>
                            <Text style={{color: "#749BC2"}}>중복확인</Text>
                        </CheckButton>
                    </InputUserIdandNickNameBox>
                    <SignupText>출생년도</SignupText>
                    <YearChooseBox>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder="출생년도 선택"
                            style={{
                                backgroundColor: '#fff',
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 0,
                                marginBottom: 10,
                                borderBottomColor : '#000',
                              }}
                            containerStyle={{
                                borderRadius: 0,
                                marginBottom: 20,
                            }}
                            
                        />
                    </YearChooseBox>
                    <SignupText>성별</SignupText>
                    <ChooserSexBox>
                        <SexCheckButton 
                            onPress={() => setSex(true)}
                            active={sex === true}
                            >
                            <Text style={{color: sex === true ? 'white' : '#749BC2'}}>남자</Text>
                        </SexCheckButton>
                        <SexCheckButton 
                            onPress={() => setSex(false)}
                            active={sex === false}>
                            <Text style={{color: sex === false ? 'white' : '#749BC2'}}>여자</Text>
                        </SexCheckButton>
                    </ChooserSexBox>
                    <SignupText>여행 스타일</SignupText>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setTravelStyle(true)}
                            active={travelStyle === true}>
                            <Text>여유로운 일정</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setTravelStyle(false)}
                            active={travelStyle === false}>
                            <Text>빡빡한 일정</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <TravelStyleBlock>
                        <TravelStyleCheckBox
                            onPress={() => setTravelStyle2(true)}
                            active={travelStyle2 === true}>
                            <Text>Flex</Text>
                        </TravelStyleCheckBox>
                        <TravelStyleCheckBox
                            onPress={() => setTravelStyle2(false)}
                            active={travelStyle2 === false}>
                            <Text>절약</Text>
                        </TravelStyleCheckBox>
                    </TravelStyleBlock>
                    <AgreementBlock>
                        <AgreementBox>
                            <CheckBox
                                checked size={32}
                                checked={agreeTerms}
                                onPress={() => setAgreeTerms(!agreeTerms)}
                                title={'이용 약관에 동의합니다.'}
                                />
                            <AgreementButton>
                                <Text>보기</Text>
                            </AgreementButton>
                        </AgreementBox>
                        <AgreementBox>
                            <CheckBox
                                checked size={32}
                                checked={agreePrivacy}
                                onPress={() => setAgreePrivacy(!agreePrivacy)}
                                title={'개인정보 처리방침에 동의합니다.'}
                                />
                            <AgreementButton>
                                <Text>보기</Text>
                            </AgreementButton>
                        </AgreementBox>
                    </AgreementBlock>

                    <FormButton
                        title="로그인"
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