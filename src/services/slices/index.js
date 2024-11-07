import { modalReducer } from './modalSlice';
import { selectedIngredientsReducer } from './selectedIngredientsSlice';
import { normaApi } from '../api/normaApi';

export const rootReducer = {
  [normaApi.reducerPath]: normaApi.reducer,
  modal: modalReducer,
  selectedIngredients: selectedIngredientsReducer,
};
