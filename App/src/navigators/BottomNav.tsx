import React  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { Image } from 'react-native';
import styled from 'styled-components/native';

// Import your screens here
import Recommand from '../screens/Main/Recommand';
import Plan from '../screens/Main/Plan';
import Search from '../screens/Main/Search';
import Chat from '../screens/Main/Chat';
import MyPage from '../screens/Main/MyPage';
import { SafeAreaView } from 'react-native-safe-area-context';

//image
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Background style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 , paddingBottom : -50}}>
                <Header/>
                <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 80, // 높이를 조절
                    },
                    tabBarActiveTintColor : '#91C8E4',
                    tabBarInactiveTintColor : '#000000',
                }}
                    >
                    <Tab.Screen 
                        name="추천" 
                        component={Recommand}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <MaterialCommunityIcons 
                                    name="bookmark-outline" 
                                    size={24} 
                                    color={focused ? "#91C8E4" : "black"} />
                            ),}}/>
                    <Tab.Screen name="일정" component={Plan} options={{
                            tabBarIcon: ({ focused }) => (
                                <SimpleLineIcons 
                                    name="plane" 
                                    size={24} 
                                    color={focused ? "#91C8E4" : "black"} 
                                />
                            ),}}/>
                    <Tab.Screen name="검색" component={Search} options={{
                            tabBarIcon: ({ focused }) => (
                                <Feather 
                                    name="search" 
                                    size={24} 
                                    color={focused ? "#91C8E4" : "black"}  />
                            ),}}/>
                    <Tab.Screen name="채팅" component={Chat} options={{
                            tabBarIcon: ({ focused }) => (
                                <Ionicons 
                                    name="chatbox-outline" 
                                    size={24} 
                                    color={focused ? "#91C8E4" : "black"}  />
                            ),}}/>
                    <Tab.Screen name="마이" component={MyPage} options={{
                            tabBarIcon: ({ focused }) => (
                                <MaterialIcons 
                                    name="person-outline" 
                                    size={24} 
                                    color={focused ? "#91C8E4" : "black"}  />
                            ),}}/>
                </Tab.Navigator>
            </SafeAreaView>
        </Background>
    );
};

export default BottomNavigator;

const Background = styled.View`
    background-color : #FFFFFF;
`;