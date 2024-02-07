import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';
import { useRecoilState,useRecoilValue } from 'recoil';
import { isSettingState} from '../../../../libs/Recoil/userInfo';
import { IsSettingStateProps } from '../../../../libs/Recoil/userInfo';

const Setting = () => {
    const [isEnabled, setIsEnabled] = useRecoilState(isSettingState);

    const toggleSwitch = (key: keyof IsSettingStateProps) => {
        setIsEnabled({...isEnabled, [key]: !isEnabled[key]});
    };


    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="설정"/>
            <AlramSettingContainer>
                <AlramSettingText>알림 설정</AlramSettingText>
                <AlramSettingContent>
                    <AlramSettingContentText>전체 알림</AlramSettingContentText>
                    <AlramSettingSwitch
                        trackColor={{false:'' ,true:'#749BC2'}}
                        onValueChange={()=>toggleSwitch('isAllAlramState')}
                        value = {isEnabled.isAllAlramState}
                        />
                </AlramSettingContent>
                <AlramSettingContent>
                    <AlramSettingContentText>방해금지 시간 설정</AlramSettingContentText>
                    <AlramSettingSwitch
                        trackColor={{false:'' ,true:'#749BC2'}}
                        onValueChange={()=>toggleSwitch('isDisturbTimeState')}
                        value = {isEnabled.isDisturbTimeState}
                        />
                </AlramSettingContent>
                <AlramSettingContent>
                    <AlramSettingContentText>채팅 알림</AlramSettingContentText>
                    <AlramSettingSwitch
                        trackColor={{false:'' ,true:'#749BC2'}}
                        onValueChange={()=>toggleSwitch('isChatAlramState')}
                        value = {isEnabled.isChatAlramState}
                        />
                </AlramSettingContent>
                <AlramSettingContent>
                    <AlramSettingContentText>동행 게시글 추천 알림</AlramSettingContentText>
                    <AlramSettingSwitch
                        trackColor={{false:'' ,true:'#749BC2'}}
                        onValueChange={()=>toggleSwitch('isPostingAlramState')}
                        value = {isEnabled.isPostingAlramState}
                        />
                </AlramSettingContent>
            </AlramSettingContainer>
            <EtcSettingContainer>
                <EtcSettingContent>
                    <EtcSettingContentText>서비스 이용 약관</EtcSettingContentText>
                </EtcSettingContent>
                <EtcSettingContent>
                    <EtcSettingContentText>로그아웃</EtcSettingContentText>
                </EtcSettingContent>
                <EtcSettingContent>
                    <EtcSettingContentText style={{color:'red'}}>회원 탈퇴</EtcSettingContentText>
                </EtcSettingContent>
            </EtcSettingContainer>
        </SafeAreaView>
    );
};
export default Setting;

const AlramSettingContainer = styled.View`
    display: flex;
    background-color: #FFFFFF;
    
`;

const AlramSettingText = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: #000000;
    margin-left: 20;
    margin-top: 10;
`;

const AlramSettingContent = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 30;
    margin-right: 20;
    margin-top: 10;
    justify-content: space-between;
`;

const AlramSettingContentText = styled.Text`
    font-size: 18;
    font-weight: bold;
    color: #747474;
    margin-right: 20;
`;

const AlramSettingSwitch = styled.Switch`
    margin-right: 20;
`;

const EtcSettingContainer = styled.View`
    height: 100%;
    display: flex;
    background-color: #FFFFFF;
    margin-top: 20;
    border-top-width: 1;
    border-top-color: #DEDEDE;
`;

const EtcSettingContent = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 30;
    margin-right: 20;
    margin-top: 10;
`;

const EtcSettingContentText = styled.Text`
    font-size: 18;
    font-weight: bold;
    color: #747474;
    margin-top: 10;
`;


