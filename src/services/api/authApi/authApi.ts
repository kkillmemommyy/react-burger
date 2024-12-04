import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NORMA_API_BASE_URL } from '../routes';
import {
  SuccessResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RegistrationRequest,
  SuccessRegistrationAndLoginResponse,
  LoginRequest,
  SuccessRefreshTokenResponse,
} from './types';
import { localStorageGetItem, localStorageRemoveItem, localStorageSetItem } from '@/shared/utils/localStorage';
import { userActions } from '@/services/slices/userSlice/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: NORMA_API_BASE_URL,
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    refreshToken: builder.mutation<SuccessRefreshTokenResponse, void>({
      query: () => ({
        url: 'auth/token',
        method: 'POST',
        body: { token: localStorageGetItem('refreshToken') ?? '' },
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { accessToken, refreshToken },
        } = await queryFulfilled;

        localStorageSetItem('refreshToken', refreshToken);
        dispatch(userActions.setAccessToken({ accessToken }));
      },
    }),
    login: builder.mutation<SuccessRegistrationAndLoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { accessToken, refreshToken, user },
        } = await queryFulfilled;

        localStorageSetItem('refreshToken', refreshToken);
        dispatch(userActions.setUser({ user }));
        dispatch(userActions.setAccessToken({ accessToken }));
      },
    }),
    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: localStorageGetItem('refreshToken') ?? '' },
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        localStorageRemoveItem('refreshToken');
        dispatch(userActions.logout());
        await queryFulfilled;
      },
    }),
    registration: builder.mutation<SuccessRegistrationAndLoginResponse, RegistrationRequest>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { accessToken, refreshToken, user },
        } = await queryFulfilled;

        localStorageSetItem('refreshToken', refreshToken);
        dispatch(userActions.setUser({ user }));
        dispatch(userActions.setAccessToken({ accessToken }));
      },
    }),
    forgotPassword: builder.mutation<SuccessResponse, ForgotPasswordRequest>({
      query: (data) => ({
        url: 'password-reset',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<SuccessResponse, ResetPasswordRequest>({
      query: (data) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
