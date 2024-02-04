import React , { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import ImageSource from '../../../assets/Bangkok.jpg';
import CalendarComponent from '../../../components/Plan/CalanderComponent';

interface ScheduleData {
    startDate: string;
    endDate: string;
    city: string;
    image: any;
    memo: string;
};

const Plan: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(''); //#2024년 2월 3일
    const [scheduleInfo, setScheduleInfo] = useState<React.ReactNode>(''); //일정이 없습니다 or 일정 내용들

    //백엔드에서 받아온 데이터로 변경
    const scheduleData: ScheduleData[] = [
        {
            startDate: '2024-02-06',
            endDate: '2024-02-09',
            city: '방콕',
            image: ImageSource,
            memo: '푸팟퐁커리'
        },
        {
            startDate: '2024-02-14',
            endDate: '2024-02-15',
            city: '부산',
            image: ImageSource,
            memo:'광안대교 가기',
        },
    ];

    const formatDate = (date: Date) => {
        const options = { month: 'numeric', day: 'numeric', weekday: 'short' };
        return date.toLocaleDateString('ko-KR', options);
    };
    
    //컴포넌트 마운트 시 scheduleData 배열에 있는 모든 일정을 표시
    useEffect(() => {
        // UTC를 사용하면 디데이 계산할 때 시간대 영향을 배제할 수 있음
        const utcToday = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
    
        if (scheduleData.length > 0) {
            const scheduleElements = scheduleData.map((schedule, index) => {

                const scheduleStartDate = new Date(schedule.startDate);
                const scheduleEndDate = new Date(schedule.endDate);
                const utcStartDate = new Date(Date.UTC(scheduleStartDate.getFullYear(), scheduleStartDate.getMonth(), scheduleStartDate.getDate()));

                const dDay = Math.ceil((utcStartDate.getTime() - utcToday.getTime()) / (1000 * 60 * 60 * 24));

                return (
                    <ScheduleListContainer key={index}>
                        <CityImage source={schedule.image} />
                        <ScheduleTextContainer>
                            <CityTitle>{`${schedule.city}  🗓D-${dDay}`}</CityTitle>
                            <Text>{`${formatDate(scheduleStartDate)} - ${formatDate(scheduleEndDate)}`}</Text>
                        </ScheduleTextContainer>
                    </ScheduleListContainer>
                );
            });
    
            setScheduleInfo(scheduleElements);
        } else {
            setScheduleInfo(<Text>일정이 없습니다.</Text>);
        }
    }, []);
    

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
        <ScrollView style={{ backgroundColor: 'white' }}>
            <PlanContainer>
                <Title>나의 캘린더</Title>
                <CalendarComponent markedDates={markedDates} onDayPress={handleDayPress} />
                <DivisionLine/>
                <TravlePlanContainer>
                    <TravelPlanTitle>나의 여행일정</TravelPlanTitle>
                    {selectedDate && <CalendarText>{selectedDate}</CalendarText>}
                </TravlePlanContainer>
                {scheduleInfo}
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

const ScheduleListContainer = styled.View`
    flex-direction: row;
    padding: 10px 15px;
`;

const ScheduleInfoContainer = styled.View`
    flex-direction: column;
    padding: 0px 25px;
`;

const CityContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const CityImage = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 50px;
    border: 2px solid #CCCCCC;
`;

const SmallCityImage = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: 2px solid #CCCCCC;
    margin-right: 10px;
`;

const ScheduleTextContainer = styled.View`
    margin-left: 15px;
    justify-content: center;
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