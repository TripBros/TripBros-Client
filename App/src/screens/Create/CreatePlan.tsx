import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { userTokenState } from '../../libs/Recoil/authState';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { CreateHeader, PlanMemoInput, CreateHeaderTitle, CreateTitle, PostTitleInput, CreateSubmitButton, CreateSubmitButtonText } from './CreatePost/postRegister';
import { Feather } from '@expo/vector-icons';
import CalendarListModal from '../../components/Schedule/calendarListModal';
import DateSelectionBar from '../../components/Schedule/dateSelectionBar';
import CreateCountryCityPicker from '../../components/Picker/createCountryCityPicker';

import { useRecoilValue } from 'recoil';

interface PlanFormProps {
    title: string;
    country: string;
    city: string;
    startDate: string;
    endDate:string;
    memo: string | null;
}

interface DateData {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

const CreatePlanScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = useRecoilValue(userTokenState);

    //날짜 선택을 위한 상태
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [displayedDates, setDisplayedDates] = useState('');

    //서버에 보낼 폼 데이터
    const [planForm, setPlanForm] = useState<PlanFormProps>({
        title: '',
        country: '',
        city: '',
        startDate:'',
        endDate: '',
        memo: '',
    });

    const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    const handleDayPress = (day: { dateString: string }) => {
        const selectedDate = new Date(day.dateString);
    
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(selectedDate);
            setSelectedEndDate(null);
            // 시작 날짜를 선택하고, 확인 버튼의 텍스트를 업데이트
            setDisplayedDates(formatDate(selectedDate));
        } else {
            // 종료 날짜를 설정하고, 시작 및 종료 날짜를 포함한 범위로 텍스트를 업데이트
            setSelectedEndDate(selectedDate);
            const startDateString = formatDate(selectedStartDate);
            const endDateString = formatDate(selectedDate);
            setDisplayedDates(`${startDateString} ~ ${endDateString}`);
        }
    };

    const formatDate = (date: Date) => {
        const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
        return date.toLocaleDateString('ko-KR', options);
    };

    const handleConfirm = () => {
        setIsCalendarVisible(false);
        if (selectedStartDate && selectedEndDate) {
            const startDateString = formatDateToISO(selectedStartDate);
            const endDateString = formatDateToISO(selectedEndDate);
            setPlanForm({
                ...planForm,
                startDate: startDateString,
                endDate: endDateString,
            });
            setDisplayedDates(`${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`);
        }
    };

    //yyyy-mm-dd 꼴로 변경
    const formatDateToISO = (date) => {
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async () => {
        // 유효성 검사 
        if (!planForm.title) {
            Alert.alert("제목을 입력해주세요");
            return;
        } else if (!planForm.country || !planForm.city) {
            Alert.alert("나라와 도시를 선택해주세요");
            return;
        } else if (!planForm.startDate || !planForm.endDate) {
            Alert.alert("날짜를 선택해주세요");
            return;
        }

        // 서버에 폼 데이터 전송
        try {
            const response = await axios.post('서버 주소', planForm, {
                headers: {
                    // "Bearer " 접두사를 붙여 토큰을 Authorization 헤더에 추가
                    'Authorization': `Bearer ${token.accessToken}`,
                    // 필요한 경우 추가적인 헤더를 여기에 명시
                },
            });
            console.log(response);
            // 요청이 성공적으로 완료되면 성공 알림 표시
            Alert.alert("성공", "등록이 성공적으로 완료되었습니다.");
        } catch (error) {
            console.error(error);
            // 요청이 실패하면 에러 메시지를 표시
            Alert.alert("오류", "등록 중 오류가 발생했습니다.");
        }
        console.log(planForm);
        navigation.navigate('Main');
        
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <CreateHeader>
            <TouchableOpacity onPress={() => {}}>
                <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
            <CreateHeaderTitle>일정 등록</CreateHeaderTitle>
            <View style={{ width: 24 }}></View>
        </CreateHeader>

        <ScrollView style={{ flex: 1 }}>
            <CreateTitle>여행 정보를 입력해주세요</CreateTitle>
            <PostTitleInput
            placeholder="일정 제목을 입력해주세요"
            value={planForm.title}
            onChangeText={(text:string) => setPlanForm({...planForm, title: text})}/>

            <CreateCountryCityPicker />

            <CreateTitle>날짜를 선택해주세요</CreateTitle>
            <View style={{ flex: 1 }}>
            <DateSelectionBar
                displayedDates={displayedDates}
                onPress={toggleCalendar}
                isChosen={true}
            />
            </View>
            <CalendarListModal
                isCalendarListVisible={isCalendarVisible}
                onClose={() => setIsCalendarVisible(false)}
                onDayPress={handleDayPress}
                selectedStartDate={selectedStartDate}
                selectedEndDate={selectedEndDate}
                displayedDates={displayedDates}
                onConfirm={handleConfirm}
            />

            <CreateTitle>메모를 입력해주세요</CreateTitle>
            <PlanMemoInput
            multiline={true} // 여러 줄 입력 활성화
            numberOfLines={4} // Android에서 여러 줄 입력을 위해 설정
            textAlignVertical='top' // Android에서 텍스트를 상단에 정렬
            placeholder="간단한 메모를 작성하는 곳입니다."
            value={planForm.memo}
            onChangeText={(text:string) => setPlanForm({...planForm, memo: text})}/>
        </ScrollView>
        <View>
        <CreateSubmitButton onPress={handleSubmit}>
            <CreateSubmitButtonText>등록하기</CreateSubmitButtonText>
        </CreateSubmitButton>
        </View>
        </SafeAreaView>
    );
};

export default CreatePlanScreen;