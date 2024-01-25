import React from 'react';
import { Text ,View,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignIn from '../../Login/SignIn';

const Recommand: React.FC = () => {
    const navigation = useNavigation();

    const handleLoginPress = () => {
      navigation.navigate('SignIn');
    };
    
    return ( <View>
         <Text>Recommand</Text>
        <Button title="로그인하기" onPress={handleLoginPress} />
      </View>
       
    );
};

export default Recommand;
