import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import store from '../../store/store';
import { autoLogoutHandler } from '../../utils/logout.util';
// import {log} from './logger.service';
import { AppConfig } from '../../configs/config';

import { userLocalStorage } from '../../storage/user.storage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: AppConfig.BASE_URL + AppConfig.API_URL + AppConfig.API_VERSION,
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  async function (config) {
    // Get the authentication token from wherever you store it (e.g., AsyncStorage)
    const authToken = store.getState().userReducer.token;
    // const token_from_LS = await userLocalStorage.getUserTokenFromLocalStorage();
    // If the token exists, add it to the request headers

    // 2️⃣ Fallback to AsyncStorage if Redux empty
    let token: string | null = authToken || null;

    if (!token) {
      try {
        token = await userLocalStorage.getUserTokenFromLocalStorage() as string | null;
      } catch (err) {
        console.warn("Failed to retrieve token from local storage:", ); //err
      }
    }

    // 3️⃣ Attach token if found
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle request errors
    return Promise.reject(error);
  },
);



// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with successful response
    if (
      response.data?.status === 410 ||
      response.data?.status === 401 ||
      response.data?.status === 403
    ) {
      // autoLogout();
      autoLogoutHandler()
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
