// reducers/authReducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userOtp: string | null;
  userData: any | null;  // Use a specific type if you have user data shape
}

const initialState: AuthState = {
  userOtp: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserOtpData(state, action) {
      state.userOtp = action.payload;
    },
    
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    logoutUser() {
      return initialState;
    },
  },
});

export const { getUserOtpData, setUserData, logoutUser } = authSlice.actions;
export default authSlice.reducer;