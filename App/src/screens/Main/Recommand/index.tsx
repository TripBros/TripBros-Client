import React, { useEffect,useState } from 'react';
import { Text ,View,Button, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../utils/constants';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../libs/Recoil/authState';
import { userLoginState } from '../../../libs/Recoil/authState';
//icon
import { AntDesign } from '@expo/vector-icons';

interface Item {
    id: number;
    title: string;
    content: string;
    image: NodeRequire; // require() 함수로 불러온 이미지의 타입
    bookmark: boolean;
}

const Items = [
    { id: 1, title: '장소1', content: '내용 1', image: require('./tmpImg.jpg'), bookmark: false },
    { id: 2, title: '장소2', content: '내용 2', image: require('./tmpImg.jpg'), bookmark: false },
    { id: 3, title: '장소3', content: '내용 3', image: require('./tmpImg.jpg'), bookmark: false },
    { id: 4, title: '장소4', content: '내용 4', image: require('./tmpImg.jpg'), bookmark: false },
    { id: 5, title: '장소5', content: '내용 5', image: require('./tmpImg.jpg'), bookmark: false },
    { id: 6, title: '장소6', content: '내용 6', image: require('./tmpImg.jpg'), bookmark: false },
  ]
const Recommand: React.FC = () => {
    const navigation = useNavigation();
    const token = useRecoilValue(userTokenState);
    const loginState = useRecoilValue(userLoginState);

    const [recommandPlace, setRecommandPlace] = useState<string>('');
    const [recommandRestaurants, setRecommandRestaurants] = useState<Item[]>([]);

    // // 추천장소 가져오기
    // const getRecommandPlace = async () => {
    //     try {
    //         const response = await axios.get(`추천장소 API 주소`);
    //         console.log(response.data);
    //         setRecommandPlace(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // // 해당 추천 장소의 맛집 가져오기
    // const getRecommandRestaurants = async () => {
    //     try {
    //         const response = await axios.post(`추천맛집 API 주소`,recommandPlace);
    //         console.log(response.data);
    //         setRecommandRestaurants(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // 아이템들을 2개씩 그룹화합니다.
    const groupedItems = recommandRestaurants.reduce<Item[][]>((result, item, index) => {
        const chunkIndex = Math.floor(index / 2);

        if (!result[chunkIndex]) {
        result[chunkIndex] = []; // 새로운 그룹 시작
        }

        result[chunkIndex].push(item); // 그룹에 아이템 추가
        return result;
    }, []);

    const handleClickHeart = async (id: number) => {
        if (!loginState) {
          Alert.alert('로그인이 필요한 서비스입니다.');
          return;
        }

        setRecommandRestaurants(currentItems =>
            currentItems.map(item =>
              item.id === id ? { ...item, bookmark: !item.bookmark } : item
            )
            
          );
        // try {
        //   const response = await axios.post(`추천맛집 좋아요 저장 API 주소`, {
        //     restaurantId: id // 식당 ID를 전송
        //   }, {
        //     headers: {
        //       Authorization: `Bearer ${token.accessToken}`,
        //     },
        //   });
        //   if (response.status === 200) {
        //     // 서버 응답이 성공적인 경우, 상태 업데이트
        //     setRecommandRestaurants(currentItems =>
        //       currentItems.map(item =>
        //         item.id === id ? { ...item, bookmark: !item.bookmark } : item
        //       )
        //     );
        //     console.log('좋아요 상태 변경됨');

        //       }
        // } catch (error) {
        //   console.error(error);
        // }
      };
      

    useEffect(() => {
        // const fetchData = async () => {
        //     await getRecommandPlace(); // 첫 번째 함수 호출을 기다립니다.
        //     await getRecommandRestaurants(); // 첫 번째 함수가 완료된 후 두 번째 함수를 호출합니다.
        // };
    
        // fetchData();
        setRecommandRestaurants(Items);
    },[]);

    useEffect(() => {
        console.log('좋아요 상태 변경됨', recommandRestaurants);
      }, [recommandRestaurants]);
      
    return (
        <RecommandContainer>
            <RecommadPlaceContainer>
                <RecommandPlaceTheme>#가을여행</RecommandPlaceTheme>
                <RecommandPlaceTitle>다음 여행은 <Text style = {{color: '#749BC2'}}>오사카</Text> 어떠세요 ?</RecommandPlaceTitle>
            </RecommadPlaceContainer>
            <RecommandPlaceImageContainer>
                <RecommandPlaceImage source={require('./osaka.jpg')} />
                <RecommandPlaceText>오사카</RecommandPlaceText>
            </RecommandPlaceImageContainer>
            <RecommandRestaurantsContainer>
                <RecommandRestaurantsTitle>Trip<Text style = {{color: '#749BC2'}}>bros</Text>에서 추천하는 <Text style = {{color: '#749BC2'}}>오사카</Text> 맛집</RecommandRestaurantsTitle>
                {groupedItems.map((group, index) => (
                    <RecommandRestaurantsBox key={index} itemsCount={group.length}>
                        {group.map((item) => (
                            <RecommandRestaurantsCard key={item.id}>
                                <RecommandRestaurantImage source={item.image} />
                                <RecommandRestaurantHeart onPress={() => handleClickHeart(item.id)}>

                                    <AntDesign name={item.bookmark ? "heart" : "hearto"} size={24} color="red" />
                                </RecommandRestaurantHeart>
                                <RecommandRestaurantTitle>{item.title}</RecommandRestaurantTitle>
                                <RecommandRestaurantText>{item.content}</RecommandRestaurantText>
                            </RecommandRestaurantsCard>
                        ))}
                    </RecommandRestaurantsBox>
                ))}
            </RecommandRestaurantsContainer>
        </RecommandContainer>
                                
    );
};

export default Recommand;

const RecommandContainer = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`;

const RecommadPlaceContainer = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
`;

const RecommandPlaceTheme = styled.Text`
    margin-bottom: 5px;
    font-size: 16px;
    color: #749BC2;
    font-weight: bold;
`;

const RecommandPlaceTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const RecommandPlaceImageContainer = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 0 20px;
    align-items: center;
`;

const RecommandPlaceImage = styled.Image`
    border-radius: 10px;
    width: 327px;
    height: 159px;
`;

const RecommandPlaceText = styled.Text`
    position: absolute;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    bottom: 20px;
    left: 50px;
`;

const RecommandRestaurantsContainer = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 20px;
`;

const RecommandRestaurantsTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const RecommandRestaurantsBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background-color: #fff;
`;

const RecommandRestaurantsCard = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 10px;
`;

const RecommandRestaurantHeart = styled.TouchableOpacity`
    position: absolute;
    top: 15px;
    right: 15px;
`;

const RecommandRestaurantImage = styled.Image`
    border-radius: 16px;
`;

const RecommandRestaurantTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0px;
`;

const RecommandRestaurantText = styled.Text`
    font-size: 16px;
    margin-bottom: 10px;
`;