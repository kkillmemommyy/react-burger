import { refreshTokenApi } from './refreshTokenApi/refreshTokenApi';
import { baseApiWithReauth } from './baseApiWithReauth';
import { baseApi } from './baseApi';

export const rootApiReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  [baseApiWithReauth.reducerPath]: baseApiWithReauth.reducer,
  [refreshTokenApi.reducerPath]: refreshTokenApi.reducer,
};

export const apiMiddlewares = [baseApi.middleware, baseApiWithReauth.middleware, refreshTokenApi.middleware];
