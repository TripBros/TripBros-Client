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


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
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
                        <Image source={focused ? require('../assets/BottomNav/onClick/recommand.png'):require('../assets/BottomNav/nonClick/recommand.png')} 
                        style={{width: 24, height: 24}} />
                    ),}}/>
            <Tab.Screen name="일정" component={Plan} options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? require('../assets/BottomNav/onClick/plan.png'): require('../assets/BottomNav/nonClick/plan.png')} 
                        style={{width: 24, height: 24}} />
                    ),}}/>
            <Tab.Screen name="검색" component={Search} options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? require('../assets/BottomNav/onClick/search.png'): require('../assets/BottomNav/nonClick/search.png')} 
                        style={{width: 24, height: 24}} />
                    ),}}/>
            <Tab.Screen name="채팅" component={Chat} options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? require('../assets/BottomNav/onClick/chat.png'): require('../assets/BottomNav/nonClick/chat.png')} 
                        style={{width: 24, height: 24}} />
                    ),}}/>
            <Tab.Screen name="마이" component={MyPage} options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={focused ? require('../assets/BottomNav/onClick/mypage.png'): require('../assets/BottomNav/nonClick/mypage.png')} 
                        style={{width: 24, height: 24}} />
                    ),}}/>
        </Tab.Navigator>
    );
};

export default BottomNavigator;
