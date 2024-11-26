import { modalReducer } from './modalSlice/modalSlice';
import { selectedIngredientsReducer } from './selectedIngredientsSlice/selectedIngredientsSlice';

export const rootSlicesReducer = {
  modal: modalReducer,
  selectedIngredients: selectedIngredientsReducer,
};
