import { Ingredient, IngredientType } from '@/shared/types/api';

type SelectedIngredient<T extends IngredientType = IngredientType> = Pick<Ingredient, 'name' | 'price' | 'image'> & {
  id: string;
  createdAt: number;
  type: T;
};

export interface SelectedIngredientsState {
  bun: null | SelectedIngredient<'bun'>;
  stuffing: SelectedIngredient<'main' | 'sauce'>[];
}

export type AddIngredientPayload = Omit<SelectedIngredient, 'createdAt'>;
