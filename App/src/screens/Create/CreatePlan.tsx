import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../components/Header/stackHeader';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { userTokenState } from '../../libs/Recoil/authState';

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

interface DisplayDatesTextProps {
    displayed: boolean;
}

//더미데이터
const countriesAndCities = {
    USA: ['New York', 'Los Angeles', 'Chicago'],
    Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

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
        <SafeAreaView style={{flex: 1,backgroundColor: '#749BC2'}}>
            <StackHeader title="일정 등록"/>
            <CreatePlanContainer>
                <CreatePlanForm>
                    <PleasePlanInputText>여행 정보를 입력하세요 !</PleasePlanInputText>
                    <PlanTitleBox>
                        <PlanTitleInput
                            value={planForm.title}
                            onChangeText={(text:string) => setPlanForm({...planForm, title: text})}
                            placeholder="일정 제목을 입력해주세요"
                        />
                    </PlanTitleBox>

                        <CreateCountryCityPicker />
                    <PlanDateBox>
                        <PlanContainerText>일정 날짜를 선택해주세요</PlanContainerText>

                        <DateSelectionBar
                            displayedDates={displayedDates}
                            onPress={toggleCalendar}
                        />

                        <CalendarListModal
                            isCalendarVisible={isCalendarVisible}
                            onClose={() => setIsCalendarVisible(false)}
                            onDayPress={handleDayPress}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            displayedDates={displayedDates}
                            onConfirm={handleConfirm}
                        />
                    </PlanDateBox>
                    <PlanMemoBox>
                        <PlanContainerText>메모</PlanContainerText>
                        <PlanMemoInput
                            value={planForm.memo}
                            onChangeText={(text:string) => setPlanForm({...planForm, memo: text})}
                            multiline={true} // 여러 줄 입력 활성화
                            numberOfLines={4} // Android에서 여러 줄 입력을 위해 설정
                            textAlignVertical='top' // Android에서 텍스트를 상단에 정렬
                            placeholder="간단한 메모를 작성하는 곳입니다."
                        />
                    </PlanMemoBox>
                    <FormButton 
                        title="일정 등록"
                        onPress={handleSubmit}
                        >
                        <FormButtonText>일정 등록하기</FormButtonText>
                    </FormButton>
                </CreatePlanForm>
            </CreatePlanContainer>
        </SafeAreaView>
    );
};

export default CreatePlanScreen;

const CreatePlanContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;

const CreatePlanForm = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
`;

const PleasePlanInputText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    
`;

const PlanTitleBox = styled.View`
    margin-bottom: 20px;
    
`;

const PlanContainerText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    border-bottom-width: 1px;
    border-bottom-color: gray;
    margin-bottom: 10px;
`;

const PlanTitleInput = styled.TextInput`
    border: 1px solid #000;
    padding: 10px;
    borderColor: gray;
    borderWidth: 1px;
    padding: 10px;
    border-radius: 10px;
`;

const PlanPlaceBox = styled.View`
`;

const PlanDateBox = styled.View`
    margin-bottom: 20px;
    align-items: center;
`;

const PlanMemoBox = styled.View`
    margin-bottom: 20px;
`;

const PlanMemoInput = styled.TextInput`
    height: 100px;
    borderColor: gray;
    borderWidth: 1px;
    padding: 10px;
    border-radius: 10px;
    ${Platform.select({
    ios: `
        paddingTop: 10px;
    `,
    android: `
        textAlignVertical: top;
    `,
    })}
    `;


const FormButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: #91C8E4;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    /* iOS 그림자 스타일 */
    shadow-color: #000;
    shadow-offset: 2px 2px;
    shadow-opacity: 0.3;
    shadow-radius: 4.65px;

    /* Android 그림자 스타일 */
    elevation: 8;
`;

const FormButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #fff;
`;