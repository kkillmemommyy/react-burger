import { modalReducer } from './modalSlice/modalSlice';
import { selectedIngredientsReducer } from './selectedIngredientsSlice/selectedIngredientsSlice';
import { normaApi } from '../api/normaApi';

export const rootReducer = {
  [normaApi.reducerPath]: normaApi.reducer,
  modal: modalReducer,
  selectedIngredients: selectedIngredientsReducer,
};
