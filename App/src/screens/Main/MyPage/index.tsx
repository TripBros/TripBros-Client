import React from 'react';

//전역상태관리 
import { userLoginState } from '../../../libs/Recoil/authState';
import { useRecoilValue } from 'recoil';

import {
    MyPageContainer,
} from './styles';
import ProfileContainerContainer from './Components/porfileContainerContainer';
import ProfileTravelStyleContainerContainerContainer from './Components/profileTravelStyleContainerContainerContainer';
import MyPageMenuContainerContainer from './Components/myPageMenuContainerContainer';
import ProfileModifyContainerContainer from './Components/profileModofyContainerContainer';

const MyPage: React.FC = () => {
    // 로그인상태, 토큰
    const userLogin = useRecoilValue(userLoginState);

    return (
        <MyPageContainer>
            <ProfileContainerContainer userLoginState={userLogin} />
            <ProfileTravelStyleContainerContainerContainer userLoginState={userLogin}/>
            <ProfileModifyContainerContainer userLoginState={userLogin} />
            <MyPageMenuContainerContainer userLoginState={userLogin}/>
        </MyPageContainer>
    )
};

export default MyPage;

