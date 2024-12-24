import {
  SuccessResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RegistrationRequest,
  SuccessRegistrationAndLoginResponse,
  LoginRequest,
} from './types';
import { localStorageGetItem, localStorageRemoveItem, localStorageSetItem } from '@/shared/utils/localStorage';
import { userActions } from '@/services/slices/userSlice/userSlice';
import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
