import React, { SetStateAction, isValidElement } from 'react';
import { IsValidationProps } from '../types';
import { idRegex,passwordRegex,nameRegex } from '../../../../utils/validate/signup';
import { Alert } from 'react-native';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IsValidationState } from '../../../../libs/Recoil/signupValid';

// // 유효성 검사 상태 업데이트 함수
// const handleValidChange = (
//   setStateFunction: React.Dispatch<React.SetStateAction<any>>,
//   field: keyof IsValidationProps,
//   value: boolean
// ) => {
//   setStateFunction((prevState: IsValidationProps) => ({
//     ...prevState,
//     [field]: value
//   }));
// };

//   const setIsId = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
//     handleValidChange(setStateFunction,'isId', prop);
//   };
// const setIsPassword = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
//     handleValidChange(setStateFunction,'isPassword', prop);
//   };
// const setIsPasswordConfirm = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
//     handleValidChange(setStateFunction,'isPasswordConfirm', prop);
//   };
// const setIsNickname = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
//     handleValidChange(setStateFunction,'isNickname', prop);
//   };

// 아이디 유효성 검사 함수
const checkPassword = (
  password: string,
  setIsValidate: React.Dispatch<React.SetStateAction<IsValidationProps>>
) => {
  if (password === '') {
    setIsValidate(prevState => ({ ...prevState, isPassword: false }));
    Alert.alert('비밀번호를 입력해주세요.');
    return;
  } else if (!passwordRegex.test(password)) {
    setIsValidate(prevState => ({ ...prevState, isPassword: false }));
    Alert.alert('유효하지 않은 비밀번호입니다.');
    return;
  } else if (password.length < 8 || password.length > 16) {
    setIsValidate(prevState => ({ ...prevState, isPassword: false }));
    Alert.alert('비밀번호는 8~16자리로 입력해주세요.');
    return;
  }
  setIsValidate(prevState => ({ ...prevState, isPassword: true }));
};

const checkPasswordConfirm = (
  password:string,
  passwordCheck:string,
  setIsValidate: React.Dispatch<React.SetStateAction<IsValidationProps>>
  ) => {
  //비밀번호 확인
  if (passwordCheck === '') {
    setIsValidate(prevState => ({ ...prevState, isPasswordConfirm: false }));
      Alert.alert('비밀번호를 입력해주세요.')
      return;
  } else if (password !== passwordCheck) {
    setIsValidate(prevState => ({ ...prevState, isPasswordConfirm: false }));
      Alert.alert('비밀번호가 일치하지 않습니다.')
      return;
  }
  setIsValidate(prevState => ({ ...prevState, isPasswordConfirm: true }));
}

const checkIdDuplicate = async(
  email:string,
  setIsValidate: React.Dispatch<React.SetStateAction<IsValidationProps>>
  ) => {
  //아이디 유효성 검사 (이메일 형식)
  if (email === '') {
      setIsValidate(prevState => ({ ...prevState, isEmail: false }));
      Alert.alert('아이디를 입력해주세요.')
      return;
  } else if (!idRegex.test(email)) {
      setIsValidate(prevState => ({ ...prevState, isEmail: false }));
      Alert.alert('유효하지 않은 계정입니다.')
      return;
  }
  //아이디 중복검사
  try {
      const response = await axios.post('서버주소', email);
      // response.data를 사용하여 중복 여부를 확인하고 처리
      if (response.data.success) {
        // 아이디 사용 가능
        setIsValidate(prevState => ({ ...prevState, isEmail: true }));
      } else {
        // 아이디 중복
          setIsValidate(prevState => ({ ...prevState, isEmail: false }));
          Alert.alert('이미 사용중인 아이디입니다.');
      }
    } catch (error) {
      console.error('중복 체크 중 오류 발생:', error);
    }
}

const checkNicknameDuplicate = async(
    nickname:string,
    setIsValidate: React.Dispatch<React.SetStateAction<IsValidationProps>>
    ) => {
  //닉네임 유효성 검사 (2~10자)
  if (nickname === '') {
      setIsValidate(prevState => ({ ...prevState, isNickname: false })); 
      Alert.alert('닉네임을 입력해주세요.')
      return;
  } else if (!nameRegex.test(nickname)) {
      setIsValidate(prevState => ({ ...prevState, isNickname: false }));  
      Alert.alert('유효하지 않은 닉네임입니다.')
      return;
  } else if (nickname.length < 2 || nickname.length > 10) {
      setIsValidate(prevState => ({ ...prevState, isNickname: false }));
      Alert.alert('닉네임은 2~10자리로 입력해주세요.')
      return;
  }

  try {
      const response = await axios.post('서버주소', nickname);
      // response.data를 사용하여 중복 여부를 확인하고 처리
      if (response.data.success) {
        // 닉네임 사용 가능
        setIsValidate(prevState => ({ ...prevState, isNickname: true }));
      } else {
        // 닉네임 중복
          setIsValidate(prevState => ({ ...prevState, isNickname: false }));
          Alert.alert('이미 사용중인 닉네임입니다.');
      }
    }catch (error) {
      console.error('중복 체크 중 오류 발생:', error);
  }
}
export {
    checkPassword,
    checkPasswordConfirm,
    checkIdDuplicate,
    checkNicknameDuplicate,
}