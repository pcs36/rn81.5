import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducers';
import userSliceReducer from '../slice/user.slice'

const rootReducer = combineReducers({
    auth: authReducer,
    userReducer: userSliceReducer
});

export default rootReducer;