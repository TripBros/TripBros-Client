import React , { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Text, Linking } from 'react-native';
import styled from 'styled-components/native';
import ImageSource from '../../../assets/Bangkok.jpg';
import CalendarComponent from './Components/calanderComponent';
import { useRecoilState, useRecoilValue } from 'recoil';
import { scheduleListState, promiseListState } from '../../../libs/Recoil/scheduleList';
import ScheduleList from './Components/scheduleList';
import ScheduleInfo from './Components/scheduleInfo';
import DeleteModal from '../../../components/EditAndDelete/deleteModal';
import axios from 'axios';
import { userTokenState } from '../../../libs/Recoil/authState';

import useHandleScroll from '../../../hooks/useHandleScroll';
import PlusButton from '../../../components/ActionButton/PlusButton';

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
    const { handleScroll, showButton } = useHandleScroll();
    
    const [selectedDate, setSelectedDate] = useState(''); //#2024년 2월 3일
    const [scheduleInfo, setScheduleInfo] = useState<React.ReactNode>(null); //일정 세부 내용들 or 일정이 없습니다.
    const [refreshing, setRefreshing] = useState(false); //for 새로고침
    
    const [scheduleData, setScheduleData] = useRecoilState(scheduleListState);
    const [promiseData, setPromiseData] = useRecoilState(promiseListState);
    const token = useRecoilValue(userTokenState);
    console.log(token);

    const { pastSchedules, currentSchedules, futureSchedules } = classifySchedules(scheduleData);

    //일정 삭제
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scheduleIdToDelete, setScheduleIdToDelete] = useState<Number | null>(null);

    const onDeleteSchedule = (Id: Number) => {
        setScheduleData(current => current.filter(schedule => schedule.scheduleId !== Id));
        setIsModalVisible(false);
    };

    const showDeleteConfirmation = (Id: Number) => {
        setScheduleIdToDelete(Id);
        setIsModalVisible(true);
    };

    const cancelDelete = () => {
        setIsModalVisible(false);
        setScheduleIdToDelete(null);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setSelectedDate(''); //새로고침 시 selectedDate 초기화
        //timeout(임시)
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };
    
    //컴포넌트 마운트 시 scheduleData 배열에 있는 모든 일정을 표시
    // useEffect(() => {
    //     const fetchSchedules = async () => {
    //         try {
    //             const response = await axios.get('http://20.214.153.179:8080/api/schedule', {
    //             headers: {
    //                 Authorization: `Bearer ${token.accessToken}`, 
    //             },
    //         });

    //             const data = response.data;
    //             const adaptedData = data.data.map(schedule => ({
    //                 scheduleId: schedule.id,
    //                 startDate: schedule.startDate,
    //                 endDate: schedule.endDate,
    //                 country: schedule.country,
    //                 city: schedule.city,
    //                 image: ImageSource,
    //                 memo: schedule.memo,
    //             }));
    //             setScheduleData(adaptedData);
    //             console.log(adaptedData);
    //         } catch (error) {
    //             if (error.response) {
    //                 console.log(error.response.data);
    //             }
    //         }
    //     };

    //     fetchSchedules();
    // }, [refreshing, token]);
    useEffect(() => {
        setScheduleData([
            {
                scheduleId: 1,
                startDate: '2024-03-06',
                endDate: '2024-03-09',
                country: '태국',
                city: '방콕',
                image: ImageSource,
                memo: '푸팟퐁커리',
            },
            {
                scheduleId: 2,
                startDate: '2024-03-14',
                endDate: '2024-03-19',
                country: '대한민국',
                city: '부산',
                image: ImageSource,
                memo: '광안대교 가기',
            },
            {
                scheduleId: 3,
                startDate: '2024-03-20',
                endDate: '2024-03-31',
                country: '미국',
                city: '뉴욕',
                image: ImageSource,
                memo: '베이글',
            },
        ]);
        setPromiseData([
            {
                promiseId: 1,
                startDate: '2024-03-04',
                endDate: '2024-03-04',
                country: '태국',
                city: '방콕',
                postTitle: '태국 방콕 같이 가실 분',
            },
            {
                promiseId: 2,
                startDate: '2024-03-20',
                endDate: '2024-03-23',
                country: '미국',
                city: '뉴욕',
                postTitle: '미국 뉴욕 같이 가실 분',
                placeName: 'Liberty Bagels Midtown, West 35th Street, New York, NY, USA',
                placeId: 'ChIJEWqQDLJZwokR8K5wVBL9n6g',
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

        // 약속 데이터에서 날짜 검색
        const promiseInfoForSelectedDate = promiseData.find(promise => {
            const promiseStartObject = new Date(Date.UTC(new Date(promise.startDate).getFullYear(), new Date(promise.startDate).getMonth(), new Date(promise.startDate).getDate()));

            const promiseEndObject = new Date(Date.UTC(new Date(promise.endDate).getFullYear(), new Date(promise.endDate).getMonth(), new Date(promise.endDate).getDate()));
            
            return selectedDateObject >= promiseStartObject && selectedDateObject <= promiseEndObject;
        });

        let infoToDisplay = null;

        const handlePlacePress = () => {
            // promiseInfoForSelectedDate가 유효한지 확인하고 placeId가 있는지 확인합니다.
            if (promiseInfoForSelectedDate && promiseInfoForSelectedDate.placeId) {
                const placeUrl = `https://www.google.com/maps/place/?q=place_id:${promiseInfoForSelectedDate.placeId}`;
                // placeUrl을 사용하여 링크를 엽니다.
                Linking.openURL(placeUrl).catch(err => {
                    console.error("Couldn't load page", err);
                });
            }
        };

        if (scheduleInfoForSelectedDate) {
            // 스케줄 정보를 표시합니다.
            infoToDisplay = (
                <ScheduleInfo
                    image={scheduleInfoForSelectedDate.image}
                    city={scheduleInfoForSelectedDate.city}
                    memo={scheduleInfoForSelectedDate.memo}
                />
            );
        } 
    
        if (promiseInfoForSelectedDate) {
            const placeUrl = promiseInfoForSelectedDate.placeId
        ? `https://www.google.com/maps/place/?q=place_id:${promiseInfoForSelectedDate.placeId}`
        : '';
        
            infoToDisplay = (
                <>
                {infoToDisplay}
                <PromiseContainer>
                    <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>해당 게시글을 통해 확정된 약속이 있습니다.</Text>
                    <Text style={{ marginBottom: 5 }}>{`${promiseInfoForSelectedDate.postTitle}`}</Text>
                    {
                        promiseInfoForSelectedDate.placeName && 
                        <Text>{`장소: ${promiseInfoForSelectedDate.placeName}`}</Text>
                    }
                    <PromiseButton onPress={()=>{}}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>게시글 보러가기</Text>
                    </PromiseButton>
                    {
                        promiseInfoForSelectedDate.placeName && 
                        <PromiseButton onPress={handlePlacePress}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>장소 보러가기</Text>
                        </PromiseButton>
                    }
                </PromiseContainer>
                </>
            );
        }
    
        if (!infoToDisplay) {
            // 일치하는 스케줄이나 약속이 없을 경우, NoScheduleInfo 컴포넌트를 표시합니다.
            infoToDisplay = <NoScheduleInfo />;
        }
    
        setScheduleInfo(infoToDisplay);
    };

    return (
        <>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={{ backgroundColor: 'white' }}
                    onScroll={handleScroll} scrollEventThrottle={10}>
            <PlanContainer>
                <CalendarComponent scheduleData={scheduleData} promiseData={promiseData} onDayPress={handleDayPress} />
                <DivisionLine/>
                <TravlePlanContainer>
                    <TravelPlanTitle>나의 일정</TravelPlanTitle>
                    {selectedDate && <CalendarText>{selectedDate}</CalendarText>}
                </TravlePlanContainer>
                {!selectedDate ? (
                <ScheduleListContainer>
                    {currentSchedules.length > 0 && (
                        <ScheduleList 
                            scheduleData={currentSchedules} onDeleteSchedule={showDeleteConfirmation}/>
                    )}
                    {futureSchedules.length > 0 && (
                        <PastFutureContainer>
                            <ScheduleInfoText>예정된 여행 일정</ScheduleInfoText>
                            <ScheduleList 
                                scheduleData={futureSchedules} onDeleteSchedule={showDeleteConfirmation}/>
                        </PastFutureContainer>
                    )}
                    {pastSchedules.length > 0 && (
                        <PastFutureContainer>
                            <ScheduleInfoText>지난 여행 일정</ScheduleInfoText>
                            <ScheduleList 
                                scheduleData={pastSchedules} onDeleteSchedule={showDeleteConfirmation}/>
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
            <DeleteModal
                isVisible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                onCancel=  {cancelDelete}
                onConfirm={() => scheduleIdToDelete && onDeleteSchedule(scheduleIdToDelete)}
                message="해당 일정을 삭제하시겠습니까?"
            />
            </PlanContainer>
        </ScrollView>
        {showButton && <PlusButton />}
        </>
    );
};
export default Plan;

const PlanContainer = styled.View`
    flex: 1;
    background-color: white;
`

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
    font-size: 18px;
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

const PromiseContainer= styled.View`
    margin: 20px;
    border-radius: 10px;
    border-color: #DADADA;
    padding: 15px;
    border-width: 1;
`;

const PromiseButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    padding: 15px;
    background-color: #DADADA;
    border-radius: 5px;
`;