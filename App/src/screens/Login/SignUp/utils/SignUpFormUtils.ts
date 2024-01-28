import React from 'react';
import { SignUpFormState } from '../types';

const handleInputChange = (
    setStateFunction: React.Dispatch<React.SetStateAction<any>>,
    field: keyof SignUpFormState,
    value: string | number | boolean
  ) => {
    setStateFunction((prevState: SignUpFormState) => ({
      ...prevState,
      [field]: value
    }));
  };

const setUserId = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: string) => {
    handleInputChange(setStateFunction,'userId', prop);
  };
const setProfileImage = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: string) => {
    handleInputChange(setStateFunction,'profileImage', prop);
  }
const setPassword = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: string) => {
    handleInputChange(setStateFunction,'password', prop);
  };
const setNickname = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: string) => {
    handleInputChange(setStateFunction,'nickname', prop);
  };
const setBirth = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: number) => {
    handleInputChange(setStateFunction,'birth', prop);
  };
const setSex = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: string) => {
    handleInputChange(setStateFunction,'sex', prop);
  };
const setlesrurely = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleInputChange(setStateFunction,'leisurely_flag', prop);
  }
const setplanner = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleInputChange(setStateFunction,'planner_flag', prop);
  }
const setadventurous = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleInputChange(setStateFunction,'adventurous_flag', prop);
  }
const setvehicle = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleInputChange(setStateFunction,'vehicle_travel_flag', prop);
  }
const setphoto = (setStateFunction: React.Dispatch<React.SetStateAction<any>>,prop: boolean) => {
    handleInputChange(setStateFunction,'photo_preference_flag', prop);
  }

export {
    setProfileImage,
    setUserId,
    setPassword,
    setNickname,
    setBirth,
    setSex,
    setlesrurely,
    setplanner,
    setadventurous,
    setvehicle,
    setphoto,
}