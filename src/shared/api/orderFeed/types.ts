import { Ingredient } from '@/shared/types/api';

export type Status = 'done' | 'created' | 'pending';

export interface Order {
  _id: string;
  ingredients: string[];
  status: Status;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface SuccessGetOrderFeedResponse {
  success: true;
  orders: Order[];
  total: number;
  totalToday: number;
}

export type EnhancedOrder = Omit<Order, 'ingredients'> & {
  totalPrice: number;
  ingredients: Ingredient[];
};

export type EnhancedOrderFeed = Omit<SuccessGetOrderFeedResponse, 'orders'> & {
  orders: EnhancedOrder[];
  pending: number[];
  completed: number[];
};
