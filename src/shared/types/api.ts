export type IngredientType = 'main' | 'bun' | 'sauce';

export enum Titles {
  BUN = 'Булки',
  SAUCE = 'Соусы',
  MAIN = 'Начинки',
}

export interface Ingredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
