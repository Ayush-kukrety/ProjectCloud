// src/lib/store.ts

import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './feature/theme/themeSlice';
import authReducer from './feature/auth/authSlice';
import adminReducer from './feature/admin/adminSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer, // Theme reducer
      auth: authReducer,   // Auth reducer
      admin: adminReducer  // Admin reducer
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];