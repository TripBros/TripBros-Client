import React, { useCallback, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/navigators/BottomNav'
import  { SafeAreaProvider, SafeAreaView }  from 'react-native-safe-area-context';
import Header from './src/components/Header'

function App() {

  return (
    <SafeAreaProvider>
      {/* 노치에 가려지지 않도록 설치했습니다 */}
      <SafeAreaView style={{ flex: 1, paddingBottom: -50 }}> 
        <NavigationContainer>
          <Header/>
          <BottomNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default App;
