import { Ingredient } from '@/shared/types/api';

export interface SuccessGetUserResponse {
  success: true;
  user: {
    email: string;
    name: string;
  };
}

export interface PatchUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export type MakeOrderRequest = { ingredients: string[] };

export interface MakeOrderResponse {
  name: string;
  success: true;
  order: {
    createdAt: string;
    updatedAt: string;
    number: number;
    name: string;
    price: number;
    status: string;
    _id: string;
    ingredients: Ingredient[];
    owner: {
      createdAt: string;
      updatedAt: string;
      email: string;
      name: string;
    };
  };
}
