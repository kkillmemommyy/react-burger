import { selectedIngredientsReducer } from './selectedIngredientsSlice/selectedIngredientsSlice';
import { userReducer } from './userSlice/userSlice';

export const rootSlicesReducer = {
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
};
