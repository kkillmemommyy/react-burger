import { EnhancedOrder } from '@/services/api/orderFeedApi/types';
import { Ingredient } from '@/shared/types/api';

export type IngredientDetails = Pick<
  Ingredient,
  'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image' | 'name'
> & {
  id: string;
};

type OrderDetails = number | null;

export interface EmptyState {
  isModalOpen: false;
  modalType: null;
  modalContent: null;
}

export interface IngredientDetailsState {
  isModalOpen: true;
  modalType: 'IngredientDetails';
  modalContent: IngredientDetails;
}

export interface OrderDetailsState {
  isModalOpen: true;
  modalType: 'OrderDetails';
  modalContent: OrderDetails;
}

export interface OrderInfoState  {
  isModalOpen: true,
  modalType: 'OrderInfo'
  modalContent: EnhancedOrder

}

export type ModalState = EmptyState | IngredientDetailsState | OrderDetailsState | OrderInfoState;

export type OpenModalPayload =
  | { modalType: 'IngredientDetails'; modalContent: IngredientDetails }
  | { modalType: 'OrderDetails'; modalContent: OrderDetails }
  | { modalType: 'OrderInfo'; modalContent: EnhancedOrder };
