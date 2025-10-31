// src/navigation/BottomTabNavigator.tsx
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppStackScreen from './AppStack'; // Your Stack Navigator
import SettingsScreen from '../screens/SettingsScreen';

type BottomTabParamList = {
  HomeTab: undefined;
  SettingsTab: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={AppStackScreen} options={{ title: 'Home12' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;