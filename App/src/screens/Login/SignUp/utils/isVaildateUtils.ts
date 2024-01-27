import React, { isValidElement } from 'react';
import { IsValidationState } from '../types';

// 유효성 검사 상태 업데이트 함수
const handleValidChange = (
  setStateFunction: React.Dispatch<React.SetStateAction<any>>,
  field: keyof IsValidationState,
  value: boolean
) => {
  setStateFunction((prevState: IsValidationState) => ({
    ...prevState,
    [field]: value
  }));
};

  const setIsId = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleValidChange(setStateFunction,'isId', prop);
  };
const setIsPassword = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleValidChange(setStateFunction,'isPassword', prop);
  };
const setIsPasswordConfirm = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleValidChange(setStateFunction,'isPasswordConfirm', prop);
  };
const setIsNickname = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleValidChange(setStateFunction,'isNickname', prop);
  };

export {
    setIsId,
    setIsPassword,
    setIsPasswordConfirm,
    setIsNickname,
}