import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  userLoginThunk,
  userAllDetailsThunk
} from '../thunks/user.thunk';
// import { loadingState } from '../../types/loadingState.type';
import { userLocalStorage } from '../../storage/user.storage';

import {
  errorMessage,
  hideMessage,
  loadingMessage,
  successMessage
} from '../Services/toast.service';
// import sampleJson from '../../../subhauler.json'

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  is_deleted: number;
  created_at: string;  // usually a date string
  updated_at: string;  // same here
}


export interface UserDetailsState {
  userProfileDetailsUpdating: boolean;
  userAuthStatus: 'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE';
  userDetails: any;
  token: string;
  userAllDetails: User[];
  userDetailsLoader: boolean;
}

const initialState: UserDetailsState = {
  userProfileDetailsUpdating: false,
  userAuthStatus: 'PENDING',
  userDetails: {},
  token: '',
  userAllDetails: [],
  userDetailsLoader: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<any>) => {
      state.userDetails = action.payload;
    },
    setUserAuthStatus: (
      state,

      action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING' | 'UPGRADE'>,
      //       action: PayloadAction<'AUTHORIZED' | 'UN_AUTHORIZED' | 'PENDING'| 'UPGRADE'>,

    ) => {
      state.userAuthStatus = action.payload;
    },
    resetUserSlice: (): any => ({
      ...initialState,
      token: '',
      userDetails: '',
      userAuthStatus: 'UN_AUTHORIZED',
    }),
    removeToken: (): any => ({
      ...initialState,
      token: '',
      userDetails: '',
    }),
  },

  extraReducers: builder => {
    // profile picture remove extra reducers


    // getUsersOtpThank
    builder.addCase(userLoginThunk.pending, state => {
      state.userProfileDetailsUpdating = true;

    });
    /* 
     builder.addCase(
      checkUserCredentialsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.userDetails = action.payload?.data;
        state.token = action.payload?.data?.token;
        userLocalStorage.saveUserTokenToLocalStorage(
          action.payload?.data?.token,
        );
        state.userAuthStatus = 'AUTHORIZED';
        state.userLoginLoading = 'SUCCESS';
      },
    );
    
    */
    builder.addCase(userLoginThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.userProfileDetailsUpdating = false;
      state.userDetails = action.payload;
      state.token = action.payload.data.token;
      userLocalStorage.saveUserTokenToLocalStorage(
        action.payload?.data?.token,
      );
      // state.subhaulerDetails = sampleJson;

    });
    builder.addCase(userLoginThunk.rejected, (state) => {
      state.userProfileDetailsUpdating = false;
    });

    // getUsersAll Details
    builder.addCase(userAllDetailsThunk.pending, state => {
      state.userDetailsLoader = true;

    });
    builder.addCase(userAllDetailsThunk.fulfilled, (state, action) => {
      state.userDetailsLoader = false;
      state.userAllDetails = action.payload.data;
      // state.subhaulerDetails = sampleJson;

    });
    builder.addCase(userAllDetailsThunk.rejected, (state) => {
      state.userDetailsLoader = false;
    });



    //dataStoreThunk
    /*  builder.addCase(dataStoreThunk.pending, state => {
       state.userProfileDetailsUpdating = true;
     });
     builder.addCase(dataStoreThunk.fulfilled, (state, action) => {
       state.userProfileDetailsUpdating = false;
       state.token = action.payload;
 
     });
     builder.addCase(dataStoreThunk.rejected, (state) => {
       state.userProfileDetailsUpdating = false;
     }); */

    // getSubhaulerRegistraionOtpThank
    /* builder.addCase(getSubhaulerRegistraionOtpThank.pending, state => {
      state.userProfileDetailsUpdating = true;
    });
    builder.addCase(getSubhaulerRegistraionOtpThank.fulfilled, (state, action) => {
      state.userProfileDetailsUpdating = false;
      // state.userDetails = action.payload.data;
      // state.subhaulerDetails = sampleJson;

    });
    builder.addCase(getSubhaulerRegistraionOtpThank.rejected, (state) => {
      state.userProfileDetailsUpdating = false;
    }); */

    //
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, setUserAuthStatus, resetUserSlice, removeToken } =
  userSlice.actions;

export default userSlice.reducer;
