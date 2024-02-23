import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import StackHeader from '../../components/Header/stackHeader';
import { Picker } from '@react-native-picker/picker';
import { Modal,StyleSheet, TouchableOpacity,View,Platform } from 'react-native';
import styled from 'styled-components/native';
import { CalendarList } from 'react-native-calendars';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';
import { Alert } from 'react-native';
import { useNavigation,NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { userTokenState } from '../../libs/Recoil/authState';
//icon
import { Feather } from '@expo/vector-icons';
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
    // 다른 나라와 도시 추가
  };
  
const CreatePlanScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const token = useRecoilValue(userTokenState);
    // 날짜 선택을 위한 상태
    //YYYY-MM-DD 형식으로 변환
    const today = new Date().toISOString().split('T')[0];
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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

    const handleDayPress = (day:DateData) => {
        if (!planForm.startDate || (planForm.startDate && planForm.endDate)) {
            // 시작 날짜 설정 또는 새로운 범위 시작
            setPlanForm({...planForm, startDate: day.dateString, endDate: ''});
          } else if (planForm.startDate && !planForm.endDate) {
            // 종료 날짜 설정
            setPlanForm({...planForm, endDate: day.dateString});
          }
        console.log(day.dateString); // '2021-12-25'
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
                    <PlanPlaceBox>
                        <PlanContainerText>나라를 선택해주세요</PlanContainerText>
                            <Picker
                                selectedValue={planForm.country}
                                // style={styles.picker}
                                onValueChange={(itemValue) => {
                                setPlanForm({...planForm, country: itemValue, city: ''})
                                }}>
                                <Picker.Item label="Country" value="" />
                                {Object.keys(countriesAndCities).map(country => (
                                <Picker.Item key={country} label={country} value={country} />
                                ))}
                            </Picker>
                            <PlanContainerText>도시를 선택해주세요</PlanContainerText>
                        <Picker
                            selectedValue={planForm.city}
                            // style={styles.picker}
                            onValueChange={(itemValue) => setPlanForm({...planForm, city: itemValue})}
                            enabled={planForm.country!== ''}>
                            <Picker.Item label="City" value="" />
                            {planForm.country ? countriesAndCities[planForm.country].map(city => (
                            <Picker.Item key={city} label={city} value={city} />
                            )) : null}
                        </Picker>
                    </PlanPlaceBox>
                    <PlanDateBox>
                        <PlanContainerText>일정 날짜를 선택해주세요</PlanContainerText>
                        <SearchBarContainer onPress={toggleCalendar}>
                            <Feather name="calendar" size={24} color="black" />
                            {planForm.startDate 
                                ? <DisplayDatesText displayed={true}>{planForm.startDate} ~ {planForm.endDate}</DisplayDatesText>
                                : <DisplayDatesText displayed={false}>날짜를 선택해주세요</DisplayDatesText>}
                        </SearchBarContainer>
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={isCalendarVisible}
                            onRequestClose={() => setIsCalendarVisible(false)}
                            >
                            <SafeAreaProvider>
                                <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
                                <ModalHeader>
                                    <CloseButton onPress={() => setIsCalendarVisible(false)}>
                                        <Feather name="x" size={24} color="black" />
                                    </CloseButton>
                                    <HeaderTitle>날짜 선택</HeaderTitle>
                                    <View style={{width: 24, height: 24}}></View>{/* 빈 요소로 균형을 맞추기 위함 */}
                                </ModalHeader>
                            <CalendarList
                                // 캘린더 옵션 설정
                                pastScrollRange={0}
                                futureScrollRange={12}
                                scrollEnabled={true}
                                showScrollIndicator={true}
                                minDate={today}
                                onDayPress={(day) => handleDayPress(day)}
                                markedDates={{
                                    [planForm.startDate]: {selected: true, color: 'blue'},
                                    [planForm.endDate]: {selected: true, color: 'blue', endingDay: true}, // 이 부분을 수정
                                  }}
                                markingType={'period'}
                            />
                            <ConfirmButton onPress={toggleCalendar}>
                                <ConfirmButtonText>확인</ConfirmButtonText>
                            </ConfirmButton>
                            </SafeAreaProvider>
                        
                        </Modal>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 50, 
        width: 300, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
    inputAndroid: {
        fontSize: 16,
        height: 50, 
        width: 300, 
        color: '#000000',
        borderColor: '#000000', 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
});

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
`;

const DisplayDatesText = styled.Text<DisplayDatesTextProps>`
  flex: 1;
  height: 40px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  color: ${props => props.displayed ? 'black' : '#C4C4C4'};
`;
const SearchBarContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 1px solid gray;
  border-radius: 30px;
  padding-horizontal: 20px;
  padding-vertical: 5px;
  margin: 10px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const CloseButton = styled.TouchableOpacity`
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const ConfirmButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 10px;
  background-color: blue;
  border-radius: 5px;
`;

const ConfirmButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
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