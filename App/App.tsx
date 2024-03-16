import React, { useCallback, useEffect, useState } from 'react';
import { TextEncoder, TextDecoder } from 'text-encoding';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/navigators/BottomNav'
import  { SafeAreaProvider, SafeAreaView }  from 'react-native-safe-area-context';
import Header from './src/components/Header'
import PlusButton from './src/components/ActionButton/PlusButton';

import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Splash from './src/screens/Splash';
import Navigator from './src/navigators/navigator';

const queryClinet = new QueryClient();

function App() {
  
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    //스플래시 로직 추가
    setTimeout(() => {
      setIsReady(true);
    }, 3000); //일단은 2초 후 로딩 상태 변경
  }, []);

  if (isReady === false) {
    return (
      <Splash/>
    );
  }

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClinet}>
        <SafeAreaProvider>
              <Navigator />
        </SafeAreaProvider>
      </QueryClientProvider>    
    </RecoilRoot>
  );
}
export default App;

// <SafeAreaProvider>
// <SafeAreaView style={{ flex: 1, paddingBottom: -50 }}> 
//   <NavigationContainer>
//     <Header/>
//     <PlusButton />
//     <BottomNavigator />
//   </NavigationContainer>
// </SafeAreaView>
// </SafeAreaProvider>
