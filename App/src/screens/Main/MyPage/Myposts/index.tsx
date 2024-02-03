import React, { useEffect,useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../../utils/constants';
import { userTokenState } from '../../../../libs/Recoil/authState';
import {
    LikePostsContainer,
} from './styles';
import PostCards from './Components/postCards';

const MyPosts: React.FC = () => {
    const token = useRecoilValue(userTokenState);
    const [myPosts, setMyPosts] = useState([]);
    // const getMyPosts = async () => {
    //     try {
    //         const response = await axios.get(`${SERVER_BASE_URL}/MyPosts`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const GetMyPosts = [
        {
            title: '제목',
            content: '내용',
            chatNum: 3,
            likeNum: 5,
            date: '2021-10-10',
        },
        {
            title: '제목',
            content: '내용',
            chatNum: 3,
            likeNum: 5,
            date: '2021-10-10',
        },
        {
            title: '제목',
            content: '내용',
            chatNum: 3,
            likeNum: 5,
            date: '2021-10-10',
        },
        {
            title: '제목',
            content: '내용',
            chatNum: 3,
            likeNum: 5,
            date: '2021-10-10',
        }
        // 다른 객체들...
    ];
    useEffect(() => {
        // 
        console.log('MyPosts 가져오기');
    }, []);

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
            <MyPageStackHeader title="내가 좋아요한 게시글"/>
            <LikePostsContainer>
            {GetMyPosts.map((post, index) => (
                <PostCards
                    key={index}
                    title={post.title}
                    content={post.content}
                    chatNum={post.chatNum}
                    likeNum={post.likeNum}
                    date={post.date}
                />
                ))}
            </LikePostsContainer>
        </SafeAreaView>
    );
};

export default MyPosts;
