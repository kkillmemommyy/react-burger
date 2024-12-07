import { Ingredient } from '@/shared/types/api';

export interface GetIngredientsResponse {
  success: boolean;
  data: Ingredient[];
}

export interface NormalizedIngredients {
  entities: Record<string, Ingredient>;
  ids: string[];
}

export type MakeOrderRequest = { ingredients: string[] };

export interface MakeOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}
