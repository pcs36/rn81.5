// import { AppDispatch } from '../store';
// import { setData } from '../reducers/authReducers';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const fetchData = (mobile: string) => async (dispatch: AppDispatch) => {
//   try {
//     // const response = await fetch('https://dummyjson.com/users');
//     // const response = await fetch('json');
//     // const data = await response.json();

//      const generatedOtp = '123456';
//      await AsyncStorage.setItem('userOtp', generatedOtp);
//     dispatch(setData(generatedOtp));
//   } catch (error) {
//     console.error('Error fetching data: ', error);
//   }
// };
// services/inviteeService.ts

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as  GlobalConfigs from '../../configs/GlobalConfigs';
import * as Apis from '../../apis/Api';

export const get_users_regs_otp = async (mobile: string) => {
  try {
    // const getData = await AsyncStorage.getItem('userDetails');
    // const token = getData ? JSON.parse(getData).token : null;

    // if (!token) {
    //   throw new Error('Token not found');
    // }
    console.log('mobile', mobile)

    // const response = await axios({
    // url: `${GlobalConfigs.API_URL}${Apis.SIGNUP_API}`,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${token}`,
    //   },
    //   data: mobile,
    // });
    const response = {
      data: {
        status: 200,
        message: "OTP Sent Successfully",
        OTP: '123456'
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_users_otp = async (mobile: string) => {
  try {
    // const getData = await AsyncStorage.getItem('userDetails');
    // const token = getData ? JSON.parse(getData).token : null;

    // if (!token) {
    //   throw new Error('Token not found');
    // }
    console.log('mobile', mobile)

    // const response = await axios({
    //   url: `${GlobalConfigs.API_URL}${Apis.LOGIN_API}`,
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${token}`,
    //   },
    //   data: mobile,
    // });
    const response = {
      data: {
        status: 200,
        message: "OTP Sent Successfully",
        OTP: '123456'
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};


