import React from 'react';
import {   
    AgreementBlock,
    AgreementBox,
    AgreementButton,
    } from '../style';
import { CheckBox } from 'react-native-elements';
import  { Text } from 'react-native';

interface CheckAgreeProps {
    agreeTerms: boolean;
    agreePrivacy: boolean;
    setAgreeTerms: (agreeTerms: boolean) => void;
    setAgreePrivacy: (agreePrivacy: boolean) => void;
}
export const CheckAgree: React.FC<CheckAgreeProps> = (
    {agreeTerms, agreePrivacy, setAgreeTerms, setAgreePrivacy}
) => {

    return(
        <><AgreementBlock>
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
        </>
    );
}