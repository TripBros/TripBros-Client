import React from 'react';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import TripFilter from '../../../components/Search/TripFilter';
import DetailTripFilter from '../../../components/Search/DetailTripFilter';
import { ScrollView } from 'react-native';
import MainPost from '../../../components/Search/MainPost';
import ImageSource from '../../../assets/basicProfile.jpg';

interface PostData {
    title: string;
    content: string;
    dateOfWriting: string;
    country: string;
    city: string;
    profileImage: any;
    nickname: string;
    ageRange: string;
    sex: string;
    startDate: string;
    endDate: string;
    numberOfMember: number;
    numberOfChat: number;
    numberOfLike: number;
};

const Search: React.FC = () => {
    //백엔드에서 받아온 데이터로 변경
    //dateOfWritind: 백엔드에 저장할 때 ISO 8601 형식을 사용하면 JS Date 객체와 호환됨. YYYY-MM-DD T HH:MM:SS
    const postDataList: PostData[] = [
        {
            title: '태국 방콕 같이 가실분',
            content: '안녕하세용 방콕 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            dateOfWriting: '2024-02-10T11:00:00Z',
            country: '태국',
            city: '방콕',
            profileImage: ImageSource, 
            nickname: '이현경',
            ageRange: '20대',
            sex: '여성',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            numberOfMember: 3,
            numberOfChat: 2,
            numberOfLike: 1,
        },
        {
            title: '미국 뉴욕 같이 가실분',
            content: '안녕하세용 미국 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            dateOfWriting: '2024-02-10T01:00:00Z',
            country: '미국',
            city: '뉴욕',
            profileImage: ImageSource, 
            nickname: '이현경',
            ageRange: '20대',
            sex: '여성',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            numberOfMember: 3,
            numberOfChat: 2,
            numberOfLike: 1,
        },
        {
            title: '일본 오사카 같이 가실분',
            content: '안녕하세용 오사카 같이 가실 분 계실까요 저는 활발한 성격이에요 어쩌구저쩌구 ',
            dateOfWriting: '2024-02-9T11:00:00Z',
            country: '일본',
            city: '오사카',
            profileImage: ImageSource, 
            nickname: '이현경',
            ageRange: '20대',
            sex: '여성',
            startDate: '2024-02-05',
            endDate: '2024-02-18',
            numberOfMember: 3,
            numberOfChat: 2,
            numberOfLike: 1,
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
                <MainPost key={index} postData={postData} />
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

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 20px;
`;