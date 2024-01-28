// RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignIn from '../screens/Login/SignIn';
import SignUp from '../screens/Login/SignUp';
import ModifyProfile from '../screens/Main/MyPage/ModifyProfile';
import MyPosts from '../screens/Main/MyPage/Myposts';
import BookmarkPlaces from '../screens/Main/MyPage/BookmarkPlaces';
import LikePosts from '../screens/Main/MyPage/LikePosts';
import Setting from '../screens/Main/MyPage/Setting';


type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ModifyProfile: undefined;
  Myposts: undefined;
  BookmarkPlaces: undefined;
  LikePosts: undefined;
  Setting: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomNavigator} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
        <Stack.Screen name="Myposts" component={MyPosts} />
        <Stack.Screen name="BookmarkPlaces" component={BookmarkPlaces} />
        <Stack.Screen name="LikePosts" component={LikePosts} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>

  );
};

export default RootNavigator;
