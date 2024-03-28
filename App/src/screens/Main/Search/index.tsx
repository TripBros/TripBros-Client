import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import TripFilter from './Components/tripFilter';
import DetailTripFilter from './Components/detailTripFilter';
import { TouchableOpacity, ScrollView } from 'react-native';
import MainPost from './Components/mainPost';
//import ImageSource from '../../../assets/basicProfile.jpg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/RootNavigator';

import axios from 'axios';
import { userTokenState } from '../../../libs/Recoil/authState';
import { useRecoilValue } from 'recoil';

import useHandleScroll from '../../../hooks/useHandleScroll';
import PlusButton from "../../../components/ActionButton/PlusButton"

export interface PostData {
    id: number,
    nickname: string,
    profileImage: string,
    hit : number,
    isBookmarked: boolean,
    age : string,
    sex: string,
    title: string,
    content: string,
    purpose: string,
    country: string,
    city: string,
    bookmarkedCount: number,
    preferSex: string,
    preferAgeRange: string| string[],
    startDate: string, 
    endDate: string,
    requiredHeadCount: number,
    nowHeadCount: number,
    chatCount: number,
    createdAt: string,

    placeName?: string,
    placeLatitude?: number,
    placeLongitude?: number,
    placeId?: string,
};

const Search: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { handleScroll, showButton } = useHandleScroll();

    // const postDataList: PostData[] = [
    //     {
    //         id: 1,
    //         nickname: '이현경',
    //         profileImage: ImageSource, 
    //         hit: 10,
    //         isBookmarked: false,
    //         age: '20대',
    //         sex: '여성',
    //         title: '태국 방콕 같이 가실분',
    //         content: '안녕하세용 방콕 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
    //         purpose: '여행',
    //         country: '태국',
    //         city: '방콕',
    //         bookmarkCount: 1,
    //         preferSex: '여성',
    //         preferAgeRange: '20대',
    //         startDate: '2024-02-05',
    //         endDate: '2024-02-18',
    //         requiredHeadCount: 3,
    //         nowHeadCount: 2,
    //         chatCount: 2,
    //         createdAt: '2024-02-24T11:00:00Z',
    //     },
    //     {
    //         id: 2,
    //         nickname: '이현경',
    //         profileImage: ImageSource, 
    //         hit: 20,
    //         isBookmarked: true,
    //         age: '20대',
    //         sex: '여성',
    //         title: '미국 뉴욕 같이 가실분',
    //         content: '안녕하세용 뉴욕 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
    //         purpose: '숙박',
    //         country: '미국',
    //         city: '뉴욕',
    //         bookmarkCount: 2,
    //         preferSex: '여성',
    //         preferAgeRange: '20대',
    //         startDate: '2024-02-05',
    //         endDate: '2024-02-18',
    //         requiredHeadCount: 3,
    //         nowHeadCount: 2,
    //         chatCount: 2,
    //         createdAt: '2024-02-23T11:00:00Z',
    //         placeName: 'Liberty Bagels Midtown, West 35th Street, New York, NY, USA',
    //         placeLatitude: 40.7524936,
    //         placeLongitude: -73.99252969999999,
    //         placeId: 'ChIJEWqQDLJZwokR8K5wVBL9n6g',
    //     },
    //     {
    //         id: 3,
    //         nickname: '이현경',
    //         profileImage: ImageSource, 
    //         hit: 10,
    //         isBookmarked: false,
    //         age: '20대',
    //         sex: '여성',
    //         title: '캐나다 벤쿠버 같이 가실분',
    //         content: '안녕하세용 벤쿠버 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
    //         purpose: '여행',
    //         country: '캐나다',
    //         city: '벤쿠버',
    //         bookmarkCount: 1,
    //         preferSex: '여성',
    //         preferAgeRange: '20대',
    //         startDate: '2024-02-05',
    //         endDate: '2024-02-18',
    //         requiredHeadCount: 3,
    //         nowHeadCount: 2,
    //         chatCount: 2,
    //         createdAt: '2024-02-22T11:00:00Z',
    //     },
    // ];

    const [postDataList, setPostDataList] = useState<PostData[]>([]);
    const token = useRecoilValue(userTokenState);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://20.214.153.179:8080/api/board', {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });
                if (response.data.success) {
                    setPostDataList(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.error('Data loading failed:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPosts();
    }, [token]);

    const sortedPostDataList = [...postDataList].sort((a, b) => {
        return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
    });

    return (
        <>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={10} style={{ backgroundColor: 'white' }}>
            <SearchContainer>
            <TripFilter />
            <DetailTripFilter />
            <SubmitButton>
                <ButtonText>게시글 확인하기</ButtonText>
                <Feather name="arrow-right" size={20} color="white" />
            </SubmitButton>
        </SearchContainer>
        <Title>최근 게시글</Title>
        {sortedPostDataList.map((postData, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailPost', { postData })}>
                <MainPost postData={postData} />
            </TouchableOpacity>
        ))}
        </ScrollView>
        {showButton && <PlusButton />}
        </>
    );
};
export default Search;

const SearchContainer = styled.View`
    flex: 1;
    background-color: white;
`

const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0px 20px 30px;
`;

const SubmitButton = styled.TouchableOpacity`
    background-color: #91C8E4;
    padding: 10px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 20px;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;