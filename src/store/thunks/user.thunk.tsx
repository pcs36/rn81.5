import { createAsyncThunk } from '@reduxjs/toolkit';
// import {userLocalStorage} from '../../storage/user.storage';
import { userApi } from '../../apis/user.api';
import { storeData, getData, clearAllData } from "../../utils/Util";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userLoginThunk = createAsyncThunk(
  'user/userLoginThunk',
  async ({ email, password }: { email: string; password: string }) => {
    console.log("user/userLoginThunk----", email, password)
    return await userApi.userLoginApi(
      email,
      password
    );
  },
);

export const userCreatThunk = createAsyncThunk(
  'user/userCreatThunk',
  async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
    // console.log("user/userLoginThunk----", email, password)
    return await userApi.userCreatpi(
      firstName,
      lastName,
      email,
      password
    );
  },
);



export const userAllDetailsThunk = createAsyncThunk(
  'user/userAllDataThunk',
  async () => {
    // console.log("user/userLoginThunk----", email, password)
    return await userApi.userAllDetailsApi();
  },
);
