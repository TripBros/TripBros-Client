import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScheduleData } from '../../libs/Recoil/scheduleList';
import HeadCounter from './CreatePost/Components/headCounter';
import PreferredAgeRange from '../../components/Filter/preferredAgeRange';
import PreferredSex from '../../components/Filter/preferredSex';
import CalendarListModal from '../../components/Schedule/calendarListModal';
import DateSelectionBar from '../../components/Schedule/dateSelectionBar';
import CreateCountryCityPicker from '../../components/Picker/createCountryCityPicker';
import { PostData } from '../Main/Search';
import ImageSource from '../../assets/Bangkok.jpg';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigators/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const EditPost = ({ route }) => {
  const { postData } = route.params;

  //postData 데이터로 초기화
  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(postData.startDate));
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(postData.endDate));
  const [displayedDates, setDisplayedDates] = useState('');

  const [Headcount, setHeadCount] = useState<number>(postData.requiredHeadCount);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>(postData.preferAgeRange);
  const [selectedSex, setSelectedSex] = useState<string>(postData.preferSex);
  
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); //캘린더 리스트 모달

  const [selectedPlace, setSelectedPlace] = useState<string>(postData.placeName);
  const [placeId, setPlaceId] = useState<string>(postData.placeId);
  const [placeLatitude, setPlaceLatitude] = useState<number>(postData.placeLatitude);
  const [placeLongitude, setPlaceLongitude] = useState<number>(postData.placeLongitude);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // 날짜 범위 문자열 업데이트
    const startDateString = formatDate(selectedStartDate);
    const endDateString = formatDate(selectedEndDate);
    setDisplayedDates(`${startDateString} - ${endDateString}`);
  }, [selectedStartDate, selectedEndDate]);

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    // 선택된 시작 날짜가 없거나, 시작 및 종료 날짜가 모두 선택되었다면
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDate);
      setSelectedEndDate(null); // 종료 날짜 초기화
    } else if (selectedStartDate && !selectedEndDate) {
      // 시작 날짜는 있지만 종료 날짜가 없는 경우
      // 종료 날짜가 시작 날짜보다 뒤에 오는지 확인
      if (selectedDate >= selectedStartDate) {
        setSelectedEndDate(selectedDate);
      } else {
        // 사용자가 종료 날짜보다 이른 시작 날짜를 선택한 경우
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    setIsCalendarVisible(false);
    if (selectedStartDate && selectedEndDate) {
      const startDateString = formatDate(selectedStartDate);
      const endDateString = formatDate(selectedEndDate);
      setDisplayedDates(`${startDateString} - ${endDateString}`);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return '';
    }
    const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString('ko-KR', options);
  };

  const handleAgeRangePress = (ageRange: string) => {
    setSelectedAgeRange(ageRange);
  };

  const handleSexPress = (Sex: string) => {
    setSelectedSex(Sex);
  };

  //예외 처리 필요
  const handleSubmit = () => {
    if (!title || !content || !selectedStartDate || !selectedEndDate || Headcount === 0) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    const newPost: PostData = {
      nickname: '예시',
      profileImage: ImageSource,
      hit: 0,
      isBookmarked: false,
      age: '20대',
      sex: '여성',
      title: title,
      content: content,
      purpose: '여행',
      country: '국가',
      city: '도시',
      bookmarkCount: 0,
      preferSex: selectedSex,
      preferAgeRange: selectedAgeRange,
      startDate: selectedStartDate.toISOString().split('T')[0], 
      endDate: selectedEndDate.toISOString().split('T')[0],
      requiredHeadCount: Headcount,
      nowHeadCount: 1,
      chatCount: 0,
      createdAt: new Date().toISOString(),
    };
  
    console.log(newPost); //백엔드 API 호출로 대체
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <HeaderTitle>게시글 수정</HeaderTitle>
        <View style={{ width: 24 }}></View>
      </Header>

      <ScrollView style={{ flex: 1 }}>
        <Title>제목을 입력해주세요</Title>
        <PostTitleInput
          placeholder="게시글 제목을 입력해주세요"
          value={title}
          onChangeText={setTitle}/>
        <Title>내용을 입력해주세요</Title>
        <PlanMemoInput
          multiline={true} // 여러 줄 입력 활성화
          numberOfLines={4} // Android에서 여러 줄 입력을 위해 설정
          textAlignVertical='top' // Android에서 텍스트를 상단에 정렬
          placeholder="나이, 성별, 성격 등을 구체적으로 기재하시면 더욱 효율적으로 동행을 구하실 수 있어요!"
          value={content}
          onChangeText={setContent}/>
        
        <CreateCountryCityPicker />

        <Title>날짜를 선택해주세요</Title>
        <View style={{ flex: 1 }}>
        <DateSelectionBar
          displayedDates={displayedDates}
          onPress={toggleCalendar}
          isChosen={true}/>
        </View>
        <CalendarListModal
            isCalendarListVisible={isCalendarVisible}
            onClose={() => setIsCalendarVisible(false)}
            onDayPress={handleDayPress}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            displayedDates={displayedDates}
            onConfirm={handleConfirm}/>

        <Title>특정 장소를 추가해주세요 (선택)</Title>
        <SearchBarContainer onPress={() => 
          navigation.navigate('SearchPlace', {
            onReturn: (place) => {
              setSelectedPlace(place.description);
              setPlaceLatitude(place.latitude);
              setPlaceLongitude(place.longitude);
              setPlaceId(place.placeId);
            }
          })
        }>
          <Feather name="search" size={24} color="black" />
          <PlaceText selected={selectedPlace}>
            {selectedPlace || "장소 검색"}
          </PlaceText>
        </SearchBarContainer>

      <Title>인원을 선택해주세요</Title>
      <HeadCounter count={Headcount} setCount={setHeadCount} />

      <Title>선호하는 나이대를 선택해주세요</Title>
      <PreferredAgeRange
        selectedAgeRange={selectedAgeRange}
        onSelectAgeRange={handleAgeRangePress}/>

      <Title>선호하는 성별을 선택해주세요</Title>
      <PreferredSex
        selectedSex={selectedSex}
        onSelectSex={handleSexPress}/>
      </ScrollView>
      <View>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>수정 완료</SubmitButtonText>
        </SubmitButton>
      </View>
    </SafeAreaView>
  );
}
export default EditPost;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  font-weight: bold;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 25px 30px 10px;
`;

const PostTitleInput = styled.TextInput`
    border: 1px solid #000;
    padding: 12px;
    borderColor: gray;
    borderWidth: 1px;
    border-radius: 10px;
    margin: 0px 25px;
`;

const PlanMemoInput = styled.TextInput`
    height: 200px;
    border: 1px solid #000;
    padding: 12px;
    borderColor: gray;
    borderWidth: 1px;
    border-radius: 10px;
    margin: 0px 25px;
    `;

const SubmitButton = styled.TouchableOpacity`
    background-color: #91C8E4;
    padding: 18px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px 20px;
`;

const SubmitButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

const SearchBarContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: 10px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
  margin: 0px 25px;
`;

const PlaceText = styled.Text`
  margin-left: 15px;
  padding-horizontal: 5px;
  color: ${props => props.selected ? 'black' : '#C4C4C4'};
`;