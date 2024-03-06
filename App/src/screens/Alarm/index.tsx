import React from "react";
import { View } from "react-native";
import ReminderAlarm from './Components/reminderAlarm';
import RecommendAlarm from "./Components/recommendAlarm";
import ModificationAlarm from "./Components/modificationAlarm";
import { SafeAreaView } from "react-native";
import { withTheme } from "react-native-elements";

const Alarm: React.FC = () => {
  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'  }}>
      <View style={{ marginTop: 20 }}>
        <ReminderAlarm/>
        <RecommendAlarm />
        <ModificationAlarm />
      </View>
    </SafeAreaView>
  );
} 
export default Alarm;