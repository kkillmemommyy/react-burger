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

export interface SuccessGetOrderResponse {
  success: true;
  orders: Order[];
}

export interface SuccessGetOrderFeedResponse {
  success: true;
  orders: Order[];
  total: number;
  totalToday: number;
}
