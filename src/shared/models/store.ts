import { configureStore } from '@reduxjs/toolkit';
import { rootSlicesReducer } from './slices';
import { rootApiReducer, apiMiddlewares } from '../api';

const rootReducer = { ...rootApiReducer, ...rootSlicesReducer };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});
