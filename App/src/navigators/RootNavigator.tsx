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
import ModifyPasswordConfirm from '../screens/Main/MyPage/ModifyProfile/ModifyPasswordConfirm';
import ModifyPassword from '../screens/Main/MyPage/ModifyProfile/ModifyPassword';
import DetailPost from '../screens/Main/Search/DetailPost';
import PostRegister from '../screens/Create/CreatePost/postRegister';
import Alarm from '../screens/Alarm/index';
import ModificationAccept from '../screens/Alarm/modificationAccept';
import { PostData } from '../screens/Main/Search/index';
import CreatePlanScreen from '../screens/Create/CreatePlan';

export type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ModifyProfile: undefined;
  Myposts: undefined;
  BookmarkPlaces: undefined;
  LikePosts: undefined;
  Setting: undefined;
  ModifyPasswordConfirm: {
    userPassword: string;
  };
  ModifyPassword: undefined;
  DetailPost: { postData: PostData };
  PostRegister: undefined;
  Alarm: undefined;
  ModificationAccept: undefined;
  CreatePlan: undefined;
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
        <Stack.Screen name="ModifyPasswordConfirm" component={ModifyPasswordConfirm}/>
        <Stack.Screen name="ModifyPassword" component={ModifyPassword}/>
        <Stack.Screen name="DetailPost" component={DetailPost} />
        <Stack.Screen name="PostRegister" component={PostRegister} />
        <Stack.Screen name="Alarm" component={Alarm} />
        <Stack.Screen name="ModificationAccept" component={ModificationAccept} />
        <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
      </Stack.Navigator>

  );
};

export default RootNavigator;
