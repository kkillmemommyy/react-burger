import { configureStore } from '@reduxjs/toolkit';
import { normaApi } from './api/normaApi';
import { rootReducer } from './slices';


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(normaApi.middleware),
});
