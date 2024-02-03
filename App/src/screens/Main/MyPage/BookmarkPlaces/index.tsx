import React, { useEffect, useState } from 'react';
import { View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyPageStackHeader from '../../../../components/Header/myPageStackHeader';
import {
    MyBookmarkBox,
    MyBookmarkContainer,
    MyBookmarkItemBox,
    MyBookmarkItemImg,
    MyBookmarkItemTitle,
    MyBookmarkItemContent,
    HeartIconContainer,
    } from './styles';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../../../utils/constants';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../../../libs/Recoil/authState';

//icon
import { AntDesign } from '@expo/vector-icons';
interface Item {
  id: number;
  title: string;
  content: string;
  image: NodeRequire; // require() 함수로 불러온 이미지의 타입
}

const itemsFromServer: Item[] = [
  { id: 1, title: '장소1', content: '내용 1', image: require('./tmpImg.jpg') },
  { id: 2, title: '장소2', content: '내용 2', image: require('./tmpImg.jpg') },
  { id: 3, title: '장소1', content: '내용 1', image: require('./tmpImg.jpg') },
  { id: 4, title: '장소2', content: '내용 2', image: require('./tmpImg.jpg') },
  { id: 5, title: '장소1', content: '내용 1', image: require('./tmpImg.jpg') },
  { id: 6, title: '장소2', content: '내용 2', image: require('./tmpImg.jpg') },
  { id: 7, title: '장소1', content: '내용 1', image: require('./tmpImg.jpg') },
];

const BookmarkPlaces: React.FC = () => {

    const token = useRecoilValue(userTokenState);
    const [items, setItems] = useState<Item[]>([]); // 상태의 타입을 Item[]로 명시합니다.

    async function getItemsFromServer() {
        // 내가 저장한 장소들 가져오기
        try {
            const response = await axios.get(`${SERVER_BASE_URL}/MyPosts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setItems(itemsFromServer);
            } catch (error) {
                console.error(error);
            }
    }

    const handleClickHeart = async(id:number) => {
        try {
            const response = await axios.post(`${SERVER_BASE_URL}/MyPosts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            console.log('좋아요 클릭');
            } catch (error) {
                console.error(error);
            }
    }

  useEffect(() => {
    //getItemsFromServer();
    setItems(itemsFromServer);
  }, []);

  // 아이템들을 2개씩 그룹화합니다.
  const groupedItems = items.reduce<Item[][]>((result, item, index) => {
    const chunkIndex = Math.floor(index / 2);

    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // 새로운 그룹 시작
    }

    result[chunkIndex].push(item); // 그룹에 아이템 추가
    return result;
  }, []);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#fff'}}>
      <MyPageStackHeader title="내가 저장한 장소"/>
      <MyBookmarkContainer>
        {groupedItems.map((group, index) => (
          <MyBookmarkBox key={index} itemsCount={group.length} >
            {group.map((item) => (
              <MyBookmarkItemBox key={item.id} itemsCount={group.length}>
                <MyBookmarkItemImg source={item.image} />
                <HeartIconContainer onPress={() => 
                  handleClickHeart(item.id)}>
                  <AntDesign name="heart" size={24} color="red" />
                </HeartIconContainer>
                <MyBookmarkItemTitle>{item.title}</MyBookmarkItemTitle>
                <MyBookmarkItemContent>{item.content}</MyBookmarkItemContent>
              </MyBookmarkItemBox>
            ))}
            {group.length === 1 && <View style={{ width: 160, height: 170 }} />}
          </MyBookmarkBox>
        ))}
      </MyBookmarkContainer>
    </SafeAreaView>
  );
};

export default BookmarkPlaces;

