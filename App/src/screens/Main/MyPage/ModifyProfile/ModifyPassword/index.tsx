import React, { useState } from 'react';
import { Text,View, TextInput, Button,Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../../components/Header/stackHeader';
import { passwordRegex } from '../../../../../utils/validate/signin';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../navigators/RootNavigator';

interface UserProfile {
    profileImage: string | null;
    email: string;
    password: string;
    nickname: string;
    birth: number;
    sex: string;
    leisurely_flag: boolean;
    planner_flag: boolean;
    adventurous_flag: boolean;
    vehicle_travel_flag: boolean;
    photo_preference_flag: boolean;
  }

const ModifyPassword = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handlePasswordConfirmChange = (text: string) => {
        setPasswordConfirm(text);
    }

    const handleSubmit = () => {
        if (!passwordRegex.test(password)) {
            Alert.alert('유효하지 않은 비밀번호입니다.')
            return;
        }else if (password !== passwordConfirm) {
            Alert.alert('비밀번호가 일치하지 않습니다');
            return;
        }

        // 비밀번호 변경 로직 
        Alert.alert('비밀번호가 변경되었습니다');
        navigation.navigate('Main');
        console.log('Submitted password:', password);
    };

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="새 비밀번호"/>
            <ModifyPasswordBlock>
                <ModifyPasswordForm>
                    <ModifyPasswordText>
                        새 비밀번호를 입력해주세요
                    </ModifyPasswordText>
                    <NewPassword
                        secureTextEntry
                        placeholder="새 비밀번호"
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    <ModifyPasswordText>
                        새 비밀번호 확인
                    </ModifyPasswordText>
                    <NewPasswordConfirm
                        secureTextEntry
                        placeholder="새 비밀번호 확인"
                        value={passwordConfirm}
                        onChangeText={handlePasswordConfirmChange}
                    />
                    <ModifyPasswordButton
                        onPress={handleSubmit}
                        >
                        <ModifyPasswordButtonText>비밀번호 변경하기</ModifyPasswordButtonText>
                    </ModifyPasswordButton>
                </ModifyPasswordForm>
            </ModifyPasswordBlock>
        </SafeAreaView>
    );
};

export default ModifyPassword;

const ModifyPasswordBlock = styled.View`
    flex: 1;
    background-color: #fff;
`;

const ModifyPasswordForm = styled.View`
    width: 100%;
    height: 100%;
    padding: 20px;
    justifyContent: 'center';
    alignItems: 'center';   
`;

const ModifyPasswordText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const NewPassword = styled.TextInput`
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom: 1px solid #000;
    font-size: 20px;
    font-weight: bold;
`;

const NewPasswordConfirm = styled.TextInput`
    width: 100%;
    height: 40px;
    padding: 10px;
    margin-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom: 1px solid #000;
    font-size: 20px;
    font-weight: bold;
`;

const ModifyPasswordButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
`;

const ModifyPasswordButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #749BC2;
`;