import { Ingredient } from '@/shared/types/api';

export type IngredientDetails = Pick<Ingredient, 'proteins' | 'fat' | 'carbohydrates' | 'calories' | 'image' | 'name'>;

type OrderNumber = number;

export interface ModalStateIngredientDetails {
  isModalOpen: boolean;
  modalType: 'IngredientDetails' | null;
  modalContent: IngredientDetails | null;
}

export interface ModalStateOrderDetails {
  isModalOpen: boolean;
  modalType: 'OrderDetails' | null;
  modalContent: OrderNumber | null;
}

export type ModalState = ModalStateIngredientDetails | ModalStateOrderDetails;

// export interface ModalStateEmpty {
//   isModalOpen: false;
//   modalType: null;
//   modalContent: null;
// }

// export interface ModalStateIngredientDetails {
//   isModalOpen: true;
//   modalType: 'IngredientDetails';
//   modalContent: IngredientDetails;
// }

// export interface ModalStateOrderDetails {
//   isModalOpen: true;
//   modalType: 'OrderDetails';
//   modalContent: OrderNumber | null;
// }

// export type ModalState = ModalStateIngredientDetails | ModalStateOrderDetails | ModalStateEmpty;

export type OpenModalPayload =
  | { modalType: 'IngredientDetails'; modalContent: IngredientDetails }
  | { modalType: 'OrderDetails'; modalContent: OrderNumber | null };
