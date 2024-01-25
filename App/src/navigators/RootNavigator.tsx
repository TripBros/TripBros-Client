// RootNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNav';
import SignIn from '../screens/Login/SignIn';
import SignUp from '../screens/Login/SignUp';

type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomNavigator} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
