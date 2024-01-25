import React, { useEffect, useState } from 'react';
import {RecoilRoot} from 'recoil';import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import  { SafeAreaProvider}  from 'react-native-safe-area-context';
import Splash from './src/screens/Splash';
import Navigator from './src/navigators/navigator';

const queryClinet = new QueryClient();

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 여기서 앱 초기화 로직을 수행합니다.
    // 예: 서버에서 데이터 가져오기, 사용자 세션 확인 등
    setTimeout(() => {
      setIsReady(true);
    }, 5000); // 예시로 2초 후 로딩 상태 변경
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
