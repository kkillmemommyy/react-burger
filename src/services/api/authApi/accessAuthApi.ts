import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NORMA_API_BASE_URL } from '../routes';
import { SuccessGetUserResponse, PatchUserRequest, MakeOrderResponse, MakeOrderRequest } from './types';
import { AppState } from '@/services';
import { localStorageGetItem, localStorageSetItem } from '@/shared/utils/localStorage';
import { authApi } from './authApi';
import { userActions } from '@/services/slices/userSlice/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: NORMA_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppState).user.accessToken;
    if (accessToken) {
      headers.set('authorization', accessToken);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorageGetItem('refreshToken');

    if (refreshToken) {
      try {
        const refreshResult = await api.dispatch(authApi.endpoints.refreshToken.initiate());

        if (refreshResult.data) {
          const { accessToken, refreshToken: newRefreshToken } = refreshResult.data;

          localStorageSetItem('refreshToken', newRefreshToken);
          api.dispatch(userActions.setAccessToken({ accessToken }));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(userActions.logout());
        }
      } catch (error) {
        api.dispatch(userActions.logout());
      }
    } else {
      api.dispatch(userActions.logout());
    }
  }

  return result;
};

export const accessAuthApi = createApi({
  reducerPath: 'accessAuthApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query<SuccessGetUserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { user },
        } = await queryFulfilled;

        dispatch(userActions.setUser({ user }));
      },
    }),
    patchUser: builder.mutation<SuccessGetUserResponse, PatchUserRequest>({
      query: (form) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: form,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { user },
        } = await queryFulfilled;

        dispatch(userActions.setUser({ user }));
      },
    }),
    makeOrder: builder.mutation<MakeOrderResponse, MakeOrderRequest>({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, usePatchUserMutation, useMakeOrderMutation } = accessAuthApi;
