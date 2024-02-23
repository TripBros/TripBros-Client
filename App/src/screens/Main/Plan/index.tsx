import React , { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Text } from 'react-native';
import styled from 'styled-components/native';
import ImageSource from '../../../assets/Bangkok.jpg';
import CalendarComponent from './Components/calanderComponent';
import { useRecoilState } from 'recoil';
import { scheduleListState } from '../../../libs/Recoil/scheduleList';
import ScheduleList from '../../../components/Schedule/scheduleList';
import ScheduleInfo from './Components/scheduleInfo';

const classifySchedules = (schedules) => {
    const today = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));

    const sortSchedules = (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

    //지난 여행 일정(종료 날짜가 오늘보다 이전)
    const pastSchedules = schedules.filter(schedule => {
    const endDate = new Date(Date.UTC(new Date(schedule.endDate).getFullYear(), new Date(schedule.endDate).getMonth(), new Date(schedule.endDate).getDate()));
        return endDate < today;
    }).sort(sortSchedules);

    //예정된 여행 일정(시작 날짜가 오늘보다 이후)
    const futureSchedules = schedules.filter(schedule => {
    const startDate = new Date(Date.UTC(new Date(schedule.startDate).getFullYear(), new Date(schedule.startDate).getMonth(), new Date(schedule.startDate).getDate()));
        return startDate > today;
    }).sort(sortSchedules);

    //현재 일정(시작 날짜가 오늘 이하이고 종료 날짜가 오늘 이상)
    const currentSchedules = schedules.filter(schedule => {
    const startDate = new Date(Date.UTC(new Date(schedule.startDate).getFullYear(), new Date(schedule.startDate).getMonth(), new Date(schedule.startDate).getDate()));
    const endDate = new Date(Date.UTC(new Date(schedule.endDate).getFullYear(), new Date(schedule.endDate).getMonth(), new Date(schedule.endDate).getDate()));
        return startDate <= today && endDate >= today;
    }).sort(sortSchedules);

    return { pastSchedules, currentSchedules, futureSchedules };
};      


const Plan: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(''); //#2024년 2월 3일
    const [scheduleInfo, setScheduleInfo] = useState<React.ReactNode>(''); //일정 세부 내용들 or 일정이 없습니다.
    const [refreshing, setRefreshing] = useState(false); //for 새로고침
    
    const [scheduleData, setScheduleData] = useRecoilState(scheduleListState);

    const { pastSchedules, currentSchedules, futureSchedules } = classifySchedules(scheduleData);

    const onRefresh = () => {
        setRefreshing(true);
        setSelectedDate(''); //새로고침 시 selectedDate 초기화
        //timeout(임시)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };
    
    //컴포넌트 마운트 시 scheduleData 배열에 있는 모든 일정을 표시
    //백엔드에서 받아온 데이터로 변경
    useEffect(() => {
        setScheduleData([
            {
                startDate: '2024-02-06',
                endDate: '2024-02-09',
                country: '태국',
                city: '방콕',
                image: ImageSource,
                memo: '',
            },
            {
                startDate: '2024-02-20',
                endDate: '2024-02-24',
                country: '대한민국',
                city: '부산',
                image: ImageSource,
                memo: '광안대교 가기',
            },
            {
                startDate: '2024-02-27',
                endDate: '2024-02-28',
                country: '미국',
                city: '뉴욕',
                image: ImageSource,
                memo: '베이글',
            },
        ]);
    }, [refreshing]);

    const NoScheduleInfo = () => (
        <NoScheduleContainer>
            <NoScheduleText>일정이 없습니다.</NoScheduleText>
        </NoScheduleContainer>
    );

    //캘린더에서 어떤 날짜 선택했을 때(selectedDateObject)
    const handleDayPress = (day: any) => {
        setSelectedDate(`#${day.year}년 ${day.month}월 ${day.day}일`);
    
        const selectedDateObject = new Date(Date.UTC(day.year, day.month - 1, day.day));
    
        //selectedDateObject가 배열 내의 어떤 schedule의 시작 날짜와 종료 날짜 사이에 있는지 찾아봄
        const scheduleInfoForSelectedDate = scheduleData.find(schedule => {
            const scheduleStartObject = new Date(Date.UTC(new Date(schedule.startDate).getFullYear(), new Date(schedule.startDate).getMonth(), new Date(schedule.startDate).getDate()));

            const scheduleEndObject = new Date(Date.UTC(new Date(schedule.endDate).getFullYear(), new Date(schedule.endDate).getMonth(), new Date(schedule.endDate).getDate()));
            
            return selectedDateObject >= scheduleStartObject && selectedDateObject <= scheduleEndObject;
        });

        if (scheduleInfoForSelectedDate) {
            setScheduleInfo(
                <ScheduleInfo
                    image={scheduleInfoForSelectedDate.image}
                    city={scheduleInfoForSelectedDate.city}
                    memo={scheduleInfoForSelectedDate.memo}
                />
            );
        } else {
            setScheduleInfo(<NoScheduleInfo />);
        }
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={{ backgroundColor: 'white' }}>
            <PlanContainer>
                <Title>나의 캘린더</Title>
                <CalendarComponent scheduleData={scheduleData} onDayPress={handleDayPress} />
                <DivisionLine/>
                <TravlePlanContainer>
                    <TravelPlanTitle>나의 여행일정</TravelPlanTitle>
                    {selectedDate && <CalendarText>{selectedDate}</CalendarText>}
                </TravlePlanContainer>
                {!selectedDate ? (
                <ScheduleListContainer>
                    {currentSchedules.length > 0 && (
                        <ScheduleList scheduleData={currentSchedules} isDetailed={true} />
                    )}
                    {futureSchedules.length > 0 && (
                        <PastFutureContainer>
                            <ScheduleInfoText>예정된 여행 일정</ScheduleInfoText>
                            <ScheduleList scheduleData={futureSchedules} isDetailed={true} />
                        </PastFutureContainer>
                    )}
                    {pastSchedules.length > 0 && (
                        <PastFutureContainer>
                            <ScheduleInfoText>지난 여행 일정</ScheduleInfoText>
                            <ScheduleList scheduleData={pastSchedules} isDetailed={true} />
                        </PastFutureContainer>
                    )}
                    {scheduleData.length === 0 && <Text>일정이 없습니다.</Text>}
                </ScheduleListContainer>
            ) : (
                // 캘린더에서 날짜를 선택한 경우에만 scheduleInfo를 보여줌.
                <ScheduleInfoContainer>
                    {scheduleInfo}
                </ScheduleInfoContainer>
            )}
            </PlanContainer>
        </ScrollView>
    );
};
export default Plan;

const PlanContainer = styled.View`
    flex: 1;
    background-color: white;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
`;

const DivisionLine = styled.View`
    height: 1px;
    background-color: #DEDEDE;
    margin-top: 30px;
`;

const TravlePlanContainer = styled.View`
    flex-direction: row; 
    align-items: center; 
    margin: 25px;
`;

const TravelPlanTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const CalendarText = styled.Text`
    color: #749BC2;
    font-size: 14px;
    margin-left: 10px;
`;

const ScheduleListContainer = styled.View`
    flex-direction: column;
    padding: 0px 10px;
`;
const ScheduleInfoContainer = styled.View`
    flex-direction: column;
    padding: 0px 15px;
`;

const PastFutureContainer = styled.View`
    margin-top: 20px;
`;

const ScheduleInfoText = styled.Text`
    font-weight: bold;
    margin-left: 15px;
`;

const NoScheduleContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const NoScheduleText = styled.Text`
    text-align: center;
    color: #333;
`;