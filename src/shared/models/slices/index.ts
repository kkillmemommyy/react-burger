import { selectedIngredientsReducer } from './selectedIngredients/selectedIngredientsSlice';
import { userReducer } from './user/userSlice';

export const rootSlicesReducer = {
  selectedIngredients: selectedIngredientsReducer,
  user: userReducer,
};
