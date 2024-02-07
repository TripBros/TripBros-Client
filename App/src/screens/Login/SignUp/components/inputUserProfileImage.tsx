import {   
    SignupText,
    ProfileImageBox,
    ProfileImage,
    ProfileImageInputButtun,
    } from '../style';
import React from 'react';
import {Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { SignUpFormState } from '../types';
import { setProfileImage } from '../utils/SignUpFormUtils';
import defaultProfileImage from '../../../../assets/basicProfile.jpg';

interface InputUserProfileImageProps {
    profileImage: string | null;
    setFormData: Dispatch<SetStateAction<SignUpFormState>>;
    }

export const InputUserProfileImage: React.FC<InputUserProfileImageProps> = ({profileImage,setFormData}) => {
    const imageSource = profileImage ? { uri: profileImage } : defaultProfileImage;

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
            setProfileImage(setFormData,result.assets[0].uri);
            console.log(result.assets[0].uri,'이미지');
          }
        };
    return (
        <>
            <SignupText>프로필 사진</SignupText>
            <ProfileImageBox  >
                <ProfileImage source ={imageSource}/>
                    <ProfileImageInputButtun onPress={uploadImage}>
                        <Text style={{color:'#A6A6A6'}}>프로필 사진 등록</Text>
                    </ProfileImageInputButtun>
            </ProfileImageBox>
        </>
    );
}