import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import StackHeader from '../../../../components/Header/stackHeader';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';

const Setting = () => {
    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="설정"/>
            <SettingContainer>
                <Text>Setting</Text>
                {/* Add your content here */}
            </SettingContainer>
        </SafeAreaView>
    );
};

export default Setting;

const SettingContainer = styled.View`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
`;
