import { modalReducer } from './modalSlice/modalSlice';
import { selectedIngredientsReducer } from './selectedIngredientsSlice/selectedIngredientsSlice';
import { userReducer } from './userSlice/userSlice';

export const rootSlicesReducer = {
  modal: modalReducer,
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
};
