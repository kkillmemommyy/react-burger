import { configureStore } from '@reduxjs/toolkit';
import { burgersApi } from './api/normaApi';
import { selectedIngredientsReducer } from './slices/selectedIngredientsSlice';
import { modalReducer } from './slices/modalSlice';

const rootReducer = {
  [burgersApi.reducerPath]: burgersApi.reducer,
  selectedIngredients: selectedIngredientsReducer,
  modal: modalReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(burgersApi.middleware),
});
