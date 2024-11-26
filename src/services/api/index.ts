import { ingredientsApi } from './ingredientsApi/ingredientsApi';
import { authApi } from './authApi/authApi';

export const rootApiReducer = {
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const apiMiddlewares = [ingredientsApi.middleware, authApi.middleware];
