type IngredientType = 'bun' | 'main' | 'sauce';

export interface SelectedIngredient<T extends IngredientType = IngredientType> {
  name: string;
  price: number;
  image: string;
  id: string;
  createdAt: number;
  type: T;
}

export interface SelectedIngredientsState {
  bun: null | SelectedIngredient<'bun'>;
  stuffing: SelectedIngredient<'main' | 'sauce'>[];
}

export type AddIngredientPayload = Omit<SelectedIngredient, 'createdAt'>;
