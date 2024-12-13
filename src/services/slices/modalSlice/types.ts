import { Ingredient } from '@/shared/types/api';

export type IngredientDetails = Pick<
  Ingredient,
  'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image' | 'name'
> & { id: string };

export interface ModalStateIngredientDetails {
  isModalOpen: boolean;
  modalType: 'IngredientDetails' | null;
  modalContent: IngredientDetails | null;
}

export interface ModalStateOrderDetails {
  isModalOpen: boolean;
  modalType: 'OrderDetails' | null;
  modalContent: number | null;
}

export type ModalState = ModalStateIngredientDetails | ModalStateOrderDetails;

export type OpenModalPayload =
  | { modalType: 'IngredientDetails'; modalContent: IngredientDetails }
  | { modalType: 'OrderDetails'; modalContent: number | null };
