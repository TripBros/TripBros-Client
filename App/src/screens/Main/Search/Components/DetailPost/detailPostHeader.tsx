import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DetailPostBottomSheet from "./detailPostBottomSheet";
import { PostData } from '../../index';

interface DetailPostHeaderProps {
  postData: PostData;
}

const DetailPostHeader: React.FC<DetailPostHeaderProps> = ({ postData }) => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [isAuthor, setIsAuthor] = useState(true);

  return(
    <HeaderContainer>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={25} color="black" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {setModalVisible(true)}}>
      <Ionicons name="ellipsis-vertical" size={20} color="black" />
    </TouchableOpacity>
    <DetailPostBottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                isAuthor={isAuthor}
                postData={postData}/>
  </HeaderContainer>
  );
}
export default DetailPostHeader;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
`;