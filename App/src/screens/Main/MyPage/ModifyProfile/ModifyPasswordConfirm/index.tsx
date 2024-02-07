import React,{useState}from 'react';
import { View, Text,Alert, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../../../../components/Header/stackHeader';
import styled from 'styled-components/native';
import { useNavigation,useRoute,RouteProp,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../navigators/RootNavigator';

const ModifyPasswordConfirm: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'ModifyPasswordConfirm'>>();
    const password = route.params.userPassword;
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (text: string) => {
        setConfirmPassword(text);
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            Alert.alert('비밀번호가 일치하지 않습니다');
            return;
        }
        navigation.navigate('ModifyPassword');
    }
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="비밀번호 확인"/>
            <ModifyPasswordConfirmeBlock>
                <ModifyPasswordConfirmForm>
                    <ModifyPasswordConfirmText>비밀번호 확인</ModifyPasswordConfirmText>
                    <UserPassword
                        secureTextEntry
                        placeholder="비밀번호를 입력해주세요"
                        value={confirmPassword}
                        onChangeText={handlePasswordChange}ㄴ
                    />
                    <ModifyPasswordConfirmButton
                        onPress={handleSubmit}
                        >
                        <ModifyPasswordConfirmButtonText>확인</ModifyPasswordConfirmButtonText>
                    </ModifyPasswordConfirmButton>
                </ModifyPasswordConfirmForm>
            </ModifyPasswordConfirmeBlock>
        </SafeAreaView>
    );
};

export default ModifyPasswordConfirm;

const ModifyPasswordConfirmeBlock = styled.View`
    flex: 1;
    background-color: #fff;
`;

const ModifyPasswordConfirmForm = styled.View`
    width: 100%;
    height: 100%;
    padding: 20px;
    justifyContent: 'center';
    alignItems: 'center';   
`;

const ModifyPasswordConfirmText = styled.Text`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
`;

const UserPassword = styled.TextInput`
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    height: 50px;
    backgroundColor: '#E5E5E5';
    marginBottom: 20px;
    border-bottom-width: 1px;
    border-bottom: 1px solid #000;
`;

const ModifyPasswordConfirmButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    border: 1px solid #749BC2;
    align-items: center;
    justify-content: center;
`;

const ModifyPasswordConfirmButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #749BC2;
`;