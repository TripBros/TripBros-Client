import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ImageSource from '../../../assets/Bangkok.jpg';

import { useRecoilValue } from 'recoil';
import { scheduleListState } from '../../../libs/Recoil/scheduleList';
import { ScheduleData } from '../../../libs/Recoil/scheduleList';
import { PostData } from '../../Main/Search';

import HeadCounter from './Components/headCounter';
import PreferredAgeRange from '../../../components/Filter/preferredAgeRange';
import PreferredSex from '../../../components/Filter/preferredSex';
import CalendarListModal from '../../../components/Schedule/calendarListModal';
import DateSelectionBar from '../../../components/Schedule/dateSelectionBar';
import CreateCountryCityPicker from '../../../components/Picker/createCountryCityPicker';

import MyScheduleList from './Components/myScheduleList';
import { formatDate } from '../../Main/Plan/Components/scheduleList';
import SingleCalendar from './Components/singleCalendar';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigators/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const PostRegister:React.FC = () => {
  const [isCalanderOpen, setIsCalanderOpen] = useState(false); //등록된 일정 리스트 열기
  const scheduleData = useRecoilValue(scheduleListState); //read only
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleData | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [Headcount, setHeadCount] = useState<number>(0);
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('');
  const [selectedSex, setSelectedSex] = useState<string>('');
  
  const [selectedView, setSelectedView] = useState('scheduleList'); //'scheduleList' 또는 'scheduleForm'
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); //단일 캘린더 모달
  const [isCalendarListVisible, setIsCalendarListVisible] = useState(false); //캘린더 리스트 모달

  const [listStartDate, setListStartDate] = useState<Date | null>(null);
  const [listEndDate, setListEndDate] = useState<Date | null>(null);
  const [formStartDate, setFormStartDate] = useState<Date | null>(null);
  const [formEndDate, setFormEndDate] = useState<Date | null>(null);
  const [listDisplayedDates, setListDisplayedDates] = useState<string>('');
  const [formDisplayedDates, setFormDisplayedDates] = useState<string>('');

  const [selectedPlace, setSelectedPlace] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [placeLatitude, setPlaceLatitude] = useState(null);
  const [placeLongitude, setPlaceLongitude] = useState(null);
  
  // useEffect(() => {
  //   console.log(`Selected Place: ${selectedPlace}`);
  //   console.log(`Latitude: ${placeLatitude}`);
  //   console.log(`Longitude: ${placeLongitude}`);
  //   console.log(`PlaceID: ${placeId}`);
  // }, [placeId]);

  const navigation = useNavigation<NavigationProp>();

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const toggleCalendarList = () => {
    setIsCalendarListVisible(!isCalendarListVisible);
  };

  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString);

    if (selectedView === 'scheduleForm') {
      if (!formStartDate || (formStartDate && formEndDate)) {
        setFormStartDate(selectedDate);
        setFormEndDate(null);
        setFormDisplayedDates(formatDate(selectedDate));
      } else {
        setFormEndDate(selectedDate);
        const startDateString = formatDate(formStartDate);
        const endDateString = formatDate(selectedDate);
        setFormDisplayedDates(`${startDateString} ~ ${endDateString}`);
      }
    } else if (selectedView === 'scheduleList') {
      if (!listStartDate || (listStartDate && listEndDate)) {
        setListStartDate(selectedDate);
        setListEndDate(null);
        setListDisplayedDates(formatDate(selectedDate));
      } else {
        setListEndDate(selectedDate);
        const startDateString = formatDate(listStartDate);
        const endDateString = formatDate(selectedDate);
        setListDisplayedDates(`${startDateString} ~ ${endDateString}`);
      }
    }
  };

  const handleConfirm = () => {
    setIsCalendarListVisible(false);
    if (formStartDate && formEndDate) {
      const startDateString = formatDate(formStartDate);
      const endDateString = formatDate(formEndDate);
      setFormDisplayedDates(`${startDateString} - ${endDateString}`);
    }
  };

  const handleListCalendarConfirm = () => {
    setIsCalendarVisible(false);
    if (formStartDate && formEndDate) {
      const startDateString = formatDate(formStartDate);
      const endDateString = formatDate(formEndDate);
      setListDisplayedDates(`${startDateString} - ${endDateString}`);
    }
  };

  // '고르기' 버튼 클릭
  const handleChoosePress = () => {
    setSelectedView('scheduleList');
    setFormStartDate(null);
    setFormEndDate(null);
    setFormDisplayedDates('');
  };

  // '작성하기' 버튼 클릭
  const handleWritePress = () => {
    setSelectedView('scheduleForm');
    setListStartDate(null);
    setListEndDate(null);
    setListDisplayedDates('');
  };

  const toggleDropdown = () => {
    setIsCalanderOpen(!isCalanderOpen);
  };

  const handleSelectSchedule = (schedule: ScheduleData) => {
    //선택된 일정을 다시 클릭하면, 전체 목록을 다시 보여줌
    if (selectedSchedule && selectedSchedule.scheduleId === schedule.scheduleId) {
      setSelectedSchedule(null);
    } else {
      setSelectedSchedule(schedule);
    }
  };

  const handleAgeRangePress = (ageRange: string) => {
    setSelectedAgeRange(ageRange);
  };

  const handleSexPress = (Sex: string) => {
    setSelectedSex(Sex);
  };

  //예외 처리 필요
  const handleSubmit = () => {
    const startDate = selectedView === 'scheduleForm' ? formStartDate : listStartDate;
    const endDate = selectedView === 'scheduleForm' ? formEndDate : listEndDate;

    if (!title || !content || !startDate || !endDate || Headcount === 0) {
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
      startDate: startDate.toISOString().split('T')[0], 
      endDate: endDate.toISOString().split('T')[0],
      requiredHeadCount: Headcount,
      nowHeadCount: 1,
      chatCount: 0,
      createdAt: new Date().toISOString(),
    };
  
    console.log(newPost); //백엔드 API 호출로 대체
  };

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <CreateHeader>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <CreateHeaderTitle>게시글 작성</CreateHeaderTitle>
        <View style={{ width: 24 }}></View>
      </CreateHeader>

      <ScrollView style={{ flex: 1 }}>
        <CreateTitle>제목을 입력해주세요</CreateTitle>
        <PostTitleInput
          placeholder="게시글 제목을 입력해주세요"
          value={title}
          onChangeText={setTitle}/>
        <CreateTitle>내용을 입력해주세요</CreateTitle>
        <PlanMemoInput
          multiline={true} // 여러 줄 입력 활성화
          numberOfLines={4} // Android에서 여러 줄 입력을 위해 설정
          textAlignVertical='top' // Android에서 텍스트를 상단에 정렬
          placeholder="나이, 성별, 성격 등을 구체적으로 기재하시면 더욱 효율적으로 동행을 구하실 수 있어요!"
          value={content}
          onChangeText={setContent}/>
        
        <CreateTitle>일정</CreateTitle>
        <ButtonContainer>
          <Button onPress={handleChoosePress} isSelected={selectedView === 'scheduleList'}>
            <ButtonText isSelected={selectedView === 'scheduleList'}>고르기</ButtonText>
          </Button>
          <Button onPress={handleWritePress} isSelected={selectedView === 'scheduleForm'}>
            <ButtonText isSelected={selectedView === 'scheduleForm'}>작성하기</ButtonText>
          </Button>
      </ButtonContainer>
        
        {selectedView === 'scheduleList' && (
          <>
            <PickContainer>
              <Feather name="calendar" size={24} color="black" style={{ marginRight: 5 }}/>
              <CreateHeaderTitle>나의 일정 캘린더</CreateHeaderTitle>
              <CircleButton onPress={toggleDropdown}>
                <Feather name={isCalanderOpen ? "chevron-up" : "chevron-down"} size={24} color="black"/>
              </CircleButton>
            </PickContainer>
            {isCalanderOpen && (
              <MyScheduleList 
                scheduleData={selectedSchedule ? [selectedSchedule] : scheduleData} 
                handleSelectSchedule={handleSelectSchedule}/>
            )}
            {selectedSchedule && (
              <>
              <CreateTitle>동행을 구할 날짜를 선택해주세요</CreateTitle>
              <View style={{ flex: 1 }}>
              <DateSelectionBar
                displayedDates={listDisplayedDates}
                onPress={toggleCalendar}
                isChosen={true}
              />
              </View>
              <SingleCalendar scheduleData={selectedSchedule} 
                              onDayPress={handleDayPress} 
                              isVisible={isCalendarVisible} 
                              onClose={() => setIsCalendarVisible(false)}
                              selectedStartDate={listStartDate}
                              selectedEndDate={listEndDate}
                              displayedDates={listDisplayedDates}
                              onConfirm={handleListCalendarConfirm}/>
              </>)}
          </>
        )}
        {selectedView === 'scheduleList' && !isCalanderOpen && (
          <PickContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AdditionalText>동행 목적, 선호하는 나이대와 성별 선택이 가능해요!</AdditionalText>
          </PickContainer>
        )}
        {selectedView === 'scheduleForm' && (
          <>
            <CreateCountryCityPicker />
            
            <CreateTitle>날짜를 선택해주세요</CreateTitle>
            <View style={{ flex: 1 }}>
            <DateSelectionBar
              displayedDates={formDisplayedDates}
              onPress={toggleCalendarList}
              isChosen={true}
            />
            </View>
            <CalendarListModal
              isCalendarListVisible={isCalendarListVisible}
              onClose={() => setIsCalendarListVisible(false)}
              onDayPress={handleDayPress}
              selectedStartDate={formStartDate}
              selectedEndDate={formEndDate}
              displayedDates={formDisplayedDates}
              onConfirm={handleConfirm}
            />
          </>
        )}

      <CreateTitle>특정 장소를 추가해주세요 (선택)</CreateTitle>
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

      <CreateTitle>인원을 선택해주세요</CreateTitle>
      <HeadCounter count={Headcount} setCount={setHeadCount} />

      <CreateTitle>선호하는 나이대를 선택해주세요</CreateTitle>
      <PreferredAgeRange
        selectedAgeRange={selectedAgeRange}
        onSelectAgeRange={handleAgeRangePress}/>

      <CreateTitle>선호하는 성별을 선택해주세요</CreateTitle>
      <PreferredSex
        selectedSex={selectedSex}
        onSelectSex={handleSexPress}/>

      </ScrollView>
      <View>
        <CreateSubmitButton onPress={handleSubmit}>
          <CreateSubmitButtonText>등록하기</CreateSubmitButtonText>
        </CreateSubmitButton>
      </View>
    </SafeAreaView>
  );
}
export default PostRegister;

export const CreateHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const CreateHeaderTitle = styled.Text`
  text-align: center;
  font-weight: bold;
  margin-right: 5px;
`;

export const CreateTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin: 25px 30px 10px;
`;

export const PostTitleInput = styled.TextInput`
    border: 1px solid #000;
    padding: 12px;
    borderColor: gray;
    borderWidth: 1px;
    border-radius: 10px;
    margin: 0px 25px;
`;

export const PlanMemoInput = styled.TextInput`
    height: 200px;
    border: 1px solid #000;
    padding: 12px;
    borderColor: gray;
    borderWidth: 1px;
    border-radius: 10px;
    margin: 0px 25px;
    `;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin: 0px 20px;
`

const Button = styled.TouchableOpacity`
  background-color: ${(props) => (props.isSelected ? '#91C8E4' : 'white')};
  border: 1.5px solid #91C8E4;
  border-radius: 30px;
  margin: 0 5px;
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.isSelected ? 'white' : '#91C8E4')};
  padding: 10px 20px;
  font-weight: bold;
`;

const PickContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 20px 0px;
`;

const CircleButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #F6F4EB;
  justify-content: center;
  align-items: center;
`;

const AdditionalText = styled.Text`
    font-size: 13px;
    color: #ACACAC;
`;

export const CreateSubmitButton = styled.TouchableOpacity`
    background-color: #91C8E4;
    padding: 18px;
    border-radius: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px 20px;
`;

export const CreateSubmitButtonText = styled.Text`
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