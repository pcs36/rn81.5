// src/navigation/AppStack.tsx
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

type AppStackParamList = {
  Home: undefined;
  Details: { itemId: number };
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Details" component={DetailsScreen} />
    </AppStack.Navigator>
  );
}

export default AppStackScreen;