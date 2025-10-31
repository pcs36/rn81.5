// // src/app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './Reducers/authReducers';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     // add more slices here
//   },

// });

// // Types for use in components
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './reducers/rootReducers';

const store = configureStore({
      reducer: rootReducers,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, 
        }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

