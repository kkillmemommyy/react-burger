import { baseApiWithReauth } from './base/baseApiWithReauth';
import { baseApi } from './base/baseApi';

export const rootApiReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  [baseApiWithReauth.reducerPath]: baseApiWithReauth.reducer,
};

export const apiMiddlewares = [baseApi.middleware, baseApiWithReauth.middleware];
