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
  RefreshTokenRequest,
} from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_BASE_URL }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation<SuccessRefreshTokenResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: 'auth/token',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<SuccessRegistrationAndLoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<SuccessResponse, RefreshTokenRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    registration: builder.mutation<SuccessRegistrationAndLoginResponse, RegistrationRequest>({
      query: (data) => ({
        url: 'auth/register',
        method: 'POST',
        body: data,
      }),
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

export const { useForgotPasswordMutation, useResetPasswordMutation } = authApi;
