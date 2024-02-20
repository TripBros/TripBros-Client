import React , { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Text } from 'react-native';
import styled from 'styled-components/native';
import ImageSource from '../../../assets/Bangkok.jpg';
import CalendarComponent from './Components/calanderComponent';
import { useRecoilState } from 'recoil';
import { ScheduleData } from '../../../libs/Recoil/scheduleList'; 
import { scheduleListState } from '../../../libs/Recoil/scheduleList';
import ScheduleList from '../../../components/Schedule/scheduleList';

const Plan: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(''); //#2024년 2월 3일
    const [scheduleInfo, setScheduleInfo] = useState<React.ReactNode>(''); //일정이 없습니다 or 일정 내용들
    const [refreshing, setRefreshing] = useState(false);
    const [scheduleData, setScheduleData] = useRecoilState(scheduleListState);

    const onRefresh = () => {
        setRefreshing(true);
        setSelectedDate(''); //새로고침 시 selectedDate 초기화
        //timeout 임시
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
                city: '방콕',
                image: ImageSource,
                memo: '푸팟퐁커리',
            },
            {
                startDate: '2024-02-14',
                endDate: '2024-02-15',
                city: '부산',
                image: ImageSource,
                memo: '광안대교 가기',
            },
        ]);
    }, [refreshing]);
    
    //캘린더에 들어가는 markedDates를 동적으로 생성하기 위함
    const generateMarkedDates = (scheduleData: ScheduleData[]) => {
            const markedDates: { [date: string]: any } = {};
        
            //배열 순회하면서 startDate랑 endDate만 가져다 씀
            scheduleData.forEach(schedule => {
            const startDate = new Date(schedule.startDate); //Date 객체로 변환
            const endDate = new Date(schedule.endDate);
        
                for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                    const dateStr = date.toISOString().split('T')[0];
            
                    if (dateStr === schedule.startDate) {
                    markedDates[dateStr] = { startingDay: true, color: '#91C8E4', textColor: 'white' };
                    } else if (dateStr === schedule.endDate) {
                    markedDates[dateStr] = { endingDay: true, color: '#91C8E4', textColor: 'white' };
                    } else {
                    markedDates[dateStr] = { color: '#AACDDF', textColor: 'white' };
                    }
                }
            });
        
            return markedDates;
        };
    
    //markedDates 생성
    const markedDates = generateMarkedDates(scheduleData);

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
            const { image, city, memo } = scheduleInfoForSelectedDate;
    
            const infoElement = (
                <ScheduleInfoContainer>
                    <CityContainer>
                        <SmallCityImage source={image} />
                        <CityTitle>{`${city} 여행`}</CityTitle>
                    </CityContainer>
                    <NoticeText>잊기 쉬운 정보들을 메모로 남겨보세요!</NoticeText>
                    <MemoText>{memo}</MemoText>
                </ScheduleInfoContainer>
            );
            setScheduleInfo(infoElement);
        } else {
        setScheduleInfo(<NoScheduleInfo />);
        }
    };

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={{ backgroundColor: 'white' }}>
            <PlanContainer>
                <Title>나의 캘린더</Title>
                <CalendarComponent markedDates={markedDates} onDayPress={handleDayPress} />
                <DivisionLine/>
                <TravlePlanContainer>
                    <TravelPlanTitle>나의 여행일정</TravelPlanTitle>
                    {selectedDate && <CalendarText>{selectedDate}</CalendarText>}
                </TravlePlanContainer>
                {selectedDate ? (
                    // selectedDate가 있을 때 scheduleInfo만 표시
                    scheduleInfo
                ) : (
                    // selectedDate가 없을 때 ScheduleList 또는 "일정이 없습니다." 텍스트 표시
                    scheduleData.length > 0 ? (
                        <ScheduleList scheduleData={scheduleData} isDetailed={true}/>
                    ) : (
                        <Text>일정이 없습니다.</Text>
                    )
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
    padding: 25px;
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

const ScheduleInfoContainer = styled.View`
    flex-direction: column;
    padding: 0px 25px;
`;

const CityContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SmallCityImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: 2px solid #CCCCCC;
    margin-right: 10px;
`;

const CityTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
`;

const NoticeText = styled.Text`
    font-size: 12.5px;
    color: grey;
    margin-top: 5px;
`;

const MemoText = styled.Text`
    margin-top: 15px;
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