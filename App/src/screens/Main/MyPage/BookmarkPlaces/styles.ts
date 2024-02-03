import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

const contentStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
const MyBookmarkContainer = styled(ScrollView).attrs({
    contentContainerStyle: contentStyles,
  })`
    flex: 1;
    background-color: #fff;
  `;

const MyBookmarkBox = styled.View`
    width: 100%;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    justify-content: space-evenly;
  `;

const MyBookmarkItemBox = styled.View`
    border-radius: 16px;
  `;

const MyBookmarkItemImg = styled.Image`
    border-radius: 16px;
    background-color: #f0f0f0;
    width: 160px;
    height: 170px;
  `;

// 클릭 가능한 하트 아이콘
const HeartIconContainer = styled.TouchableOpacity`
  position: absolute;
  top: 10px; 
  right: 10px;
`;

const MyBookmarkItemTitle = styled.Text`
    font-size: 15px;
    font-weight: 800;
    margin-top: 10px;
  `;

const MyBookmarkItemContent = styled.Text` 
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  `;

export {
    MyBookmarkContainer,
    MyBookmarkBox,
    MyBookmarkItemBox,
    MyBookmarkItemImg,
    MyBookmarkItemTitle,
    MyBookmarkItemContent,
    HeartIconContainer,
}