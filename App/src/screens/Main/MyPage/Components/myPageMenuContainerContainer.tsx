import React from 'react';
import {
    MyPageMenuContainer,
    ProfileSettingButton,
    ProfileSettingText
} from '../styles';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../navigators/RootNavigator';
import { Alert } from 'react-native';

//icon
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

interface ProfileProps {
    userLoginState: boolean;
}

const MyPageMenuContainerContainer: React.FC<ProfileProps> = ({userLoginState}) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
    if (!userLoginState) {
        return (
            <MyPageMenuContainer>
                <ProfileSettingButton 
                    onPress={() => Alert.alert('로그인이 필요한 서비스입니다.')}
                    >
                    <Entypo name="pencil" size={24} color="black" />
                    <ProfileSettingText>내가 작성한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => Alert.alert('로그인이 필요한 서비스입니다.')}
                    >
                    <MaterialCommunityIcons name="bookmark-outline" size={24} color="black" />
                    <ProfileSettingText>내가 저장한 장소</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => Alert.alert('로그인이 필요한 서비스입니다.')}
                    >
                    <AntDesign name="hearto" size={24} color="black" />
                    <ProfileSettingText>내가 좋아요한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => Alert.alert('로그인이 필요한 서비스입니다.')}
                    >
                    <Feather name="settings" size={24} color="black" />
                    <ProfileSettingText>설정</ProfileSettingText>
                </ProfileSettingButton>
            </MyPageMenuContainer>
        );
    }
    return (
        <MyPageMenuContainer>
                <ProfileSettingButton 
                    onPress={() => navigation.navigate('Myposts')}
                    >
                    <Entypo name="pencil" size={24} color="black" />
                    <ProfileSettingText>내가 작성한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('BookmarkPlaces')}
                    >
                    <MaterialCommunityIcons name="bookmark-outline" size={24} color="black" />
                    <ProfileSettingText>내가 저장한 장소</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('LikePosts')}
                    >
                    <AntDesign name="hearto" size={24} color="black" />
                    <ProfileSettingText>내가 좋아요한 게시글</ProfileSettingText>
                </ProfileSettingButton>
                <ProfileSettingButton
                    onPress={() => navigation.navigate('Setting')}
                    >
                    <Feather name="settings" size={24} color="black" />
                    <ProfileSettingText>설정</ProfileSettingText>
                </ProfileSettingButton>
            </MyPageMenuContainer>
    );
};

export default MyPageMenuContainerContainer;
