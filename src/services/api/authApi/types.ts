import { Ingredient } from '@/shared/types/api';

export type ForgotPasswordRequest = {
  email: string;
};

export interface ResetPasswordRequest {
  password: string;
  token: string;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  name: string;
}

export interface PatchUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

export type MakeOrderRequest = { ingredients: string[] };

export type LoginRequest = Pick<RegistrationRequest, 'email' | 'password'>;

export interface SuccessResponse {
  success: true;
  message: string;
}

export interface SuccessRegistrationAndLoginResponse {
  success: true;
  user: {
    email: string;
    name: string;
  };
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export interface SuccessRefreshTokenResponse {
  success: true;
  accessToken: `Bearer ${string}`;
  refreshToken: string;
}

export type SuccessGetUserResponse = Omit<SuccessRegistrationAndLoginResponse, 'accessToken' | 'refreshToken'>;

export interface MakeOrderResponse {
  name: string;
  success: boolean;
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
