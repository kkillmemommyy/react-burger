import { ingredientsApi } from './ingredientsApi/ingredientsApi';
import { authApi } from './authApi/authApi';
import { accessAuthApi } from './authApi/accessAuthApi';

export const rootApiReducer = {
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [accessAuthApi.reducerPath]: accessAuthApi.reducer,
};

export const apiMiddlewares = [ingredientsApi.middleware, authApi.middleware, accessAuthApi.middleware];
