import {
  SuccessResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RegistrationRequest,
  SuccessRegistrationAndLoginResponse,
  LoginRequest,
} from './types';
import { localStorageGetItem } from '@/shared/lib/localStorage';
import { baseApi } from '../base/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SuccessRegistrationAndLoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<SuccessResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: { token: localStorageGetItem('refreshToken') ?? '' },
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
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
