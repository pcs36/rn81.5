// src/navigation/MainNavigator.tsx
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';

type DrawerParamList = {
  Main: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function MainNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabNavigator} options={{ title: 'App' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default MainNavigator;