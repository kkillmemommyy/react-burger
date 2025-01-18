import { configureStore } from '@reduxjs/toolkit';
import { rootSlicesReducer } from '@/shared/models/slices';
import { rootApiReducer, apiMiddlewares } from '@/shared/api';

const rootReducer = { ...rootApiReducer, ...rootSlicesReducer };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiMiddlewares),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
