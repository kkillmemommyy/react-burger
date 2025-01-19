import { localStorageGetItem } from '@/shared/lib/localStorage';
import { SuccessRefreshTokenResponse } from './types';
import { baseApi } from '../base/baseApi';

export const refreshTokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation<SuccessRefreshTokenResponse, void>({
      query: () => ({
        url: 'auth/token',
        method: 'POST',
        body: { token: localStorageGetItem('refreshToken') ?? '' },
      }),
    }),
  }),
});
