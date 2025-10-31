// src/navigation/AppStack.tsx
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import Registraction from '../screens/RegistrationScreen';
import DetailsScreen from '../screens/DetailsScreen';

type AuthStackParamList = {
  Login: undefined;
  Registration: { itemId: number };
  Forgetpassword: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Registration" component={Registraction} />
      {/* <AuthStack.Screen name="Forgetpassword" component={Forgetpassword} /> */}
    </AuthStack.Navigator>
  );
}

export default AuthStackScreen;