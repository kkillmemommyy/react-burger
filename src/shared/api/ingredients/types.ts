import { Ingredient } from '@/shared/types/api';

export interface GetIngredientsResponse {
  success: true;
  data: Ingredient[];
}

export interface NormalizedIngredients {
  entities: Record<string, Ingredient>;
  ids: string[];
}
