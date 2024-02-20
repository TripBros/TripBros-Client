import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import TripFilter from './Components/tripFilter';
import DetailTripFilter from './Components/detailTripFilter';
import { TouchableOpacity, ScrollView } from 'react-native';
import MainPost from './Components/mainPost';
import ImageSource from '../../../assets/basicProfile.jpg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/RootNavigator';

//id 추가
export interface PostData {
    nickname: string,
    profileImage: any,
    hit : number,
    isBookmarked: boolean,
    age : string,
    sex: string,
    title: string,
    content: string,
    purpose: string,
    country: string,
    city: string,
    bookmarkCount: number,
    preferSex: string,
    preferAgeRange: string,
    startDate: string, 
    endDate: string,
    requiredHeadCount: number,
    nowHeadCount: number,
    chatCount: number,
    createdAt: string,
};

const Search: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    //백엔드에서 받아온 데이터로 변경
    //dateOfWritind: 백엔드에 저장할 때 ISO 8601 형식을 사용하면 JS Date 객체와 호환됨. YYYY-MM-DD T HH:MM:SS
    const postDataList: PostData[] = [
        {
            nickname: '이현경',
            profileImage: ImageSource, 
            hit: 10,
            isBookmarked: false,
            age: '20대',
            sex: '여성',
            title: '태국 방콕 같이 가실분',
            content: '안녕하세용 방콕 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            purpose: '여행',
            country: '태국',
            city: '방콕',
            bookmarkCount: 1,
            preferSex: '여성',
            preferAgeRange: '20대',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            requiredHeadCount: 3,
            nowHeadCount: 2,
            chatCount: 2,
            createdAt: '2024-02-10T11:00:00Z',
        },
        {
            nickname: '이현경',
            profileImage: ImageSource, 
            hit: 20,
            isBookmarked: true,
            age: '20대',
            sex: '여성',
            title: '미국 뉴욕 같이 가실분',
            content: '안녕하세용 뉴욕 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            purpose: '숙박',
            country: '미국',
            city: '뉴욕',
            bookmarkCount: 2,
            preferSex: '여성',
            preferAgeRange: '20대',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            requiredHeadCount: 3,
            nowHeadCount: 2,
            chatCount: 2,
            createdAt: '2024-02-9T11:00:00Z',
        },
        {
            nickname: '이현경',
            profileImage: ImageSource, 
            hit: 10,
            isBookmarked: false,
            age: '20대',
            sex: '여성',
            title: '캐나다 벤쿠버 같이 가실분',
            content: '안녕하세용 벤쿠버 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            purpose: '여행',
            country: '캐나다',
            city: '벤쿠버',
            bookmarkCount: 1,
            preferSex: '여성',
            preferAgeRange: '20대',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            requiredHeadCount: 3,
            nowHeadCount: 2,
            chatCount: 2,
            createdAt: '2024-02-10T11:00:00Z',
        },
    ];

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <SearchContainer>
            <Title>여행 정보를 입력하세요</Title>
            <TripFilter />
            <DetailTripFilter />
            <SubmitButton>
                <ButtonText>게시글 확인하기</ButtonText>
                <Feather name="arrow-right" size={20} color="white" />
            </SubmitButton>
        </SearchContainer>
        <Title>최근 게시글</Title>
        {postDataList.map((postData, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('DetailPost', { postData })}>
                <MainPost postData={postData} />
            </TouchableOpacity>
        ))}
        </ScrollView>
    );
};
export default Search;

const SearchContainer = styled.View`
    flex: 1;
    background-color: white;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 18px;
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