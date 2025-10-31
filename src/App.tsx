/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import { NewAppScreen, } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// App.tsx
// import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from '../src/navigation/MainNavigator'; // Assuming your main navigator is here
import AuthStack from '../src/navigation/AuthStack'; // Assuming your main navigator is here
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from 'react-native-splash-screen';

import { useAppDispatch, useAppSelector } from './store/thunks/hooks';

import { userLocalStorage } from '../src/storage/user.storage';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store/store';

import eventBus from './utils/eventBus';

function App() {

  const [isAuth, setIsAuth] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {
    userDetails = {},
    userAuthStatus
  } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    // SplashScreen.hide();
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)

  }, []);

  useEffect(() => {
    const loadToken = async () => {
      const token_from_LS = await userLocalStorage.getUserTokenFromLocalStorage();
      // console.log("token_from_LS-----------------------", token_from_LS)
      setIsAuth(typeof token_from_LS === 'string' ? token_from_LS : '');

      // isAuth seting from reducer--------------
      /* if (userDetails?.status === 200 && userDetails?.data?.token) {
        setIsAuth(userDetails.data.token);
        // await AsyncStorage.setItem("userDetails", userDetails);
      } else {
        setIsAuth('');
      } */
      // isAuth seting from reducer--------------

    };
    loadToken();

    const handleLogout = () => {
      console.log('Detected logout event → clearing isAuth');
      setIsAuth('');
    };

    // 👂 Listen for logout
    const subscription = eventBus.addListener('userLogout', handleLogout);

    return () => {
      subscription.remove(); // ✅ Clean up listener
    };
  }, [userDetails]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* {console.log("isAuth-----------------------", isAuth)} */}
      {/* {console.log("userDetails-----------------------", userAuthStatus)} */}
      <NavigationContainer>

        {isAuth === null || isAuth === '' ?
          <AuthStack />
          :
          <MainNavigator />
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
