import React, { useEffect, useState } from 'react';
import {RecoilRoot} from 'recoil';import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import  { SafeAreaProvider}  from 'react-native-safe-area-context';
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
