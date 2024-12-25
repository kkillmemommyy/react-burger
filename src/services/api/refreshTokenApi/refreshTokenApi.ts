import { localStorageGetItem } from '@/shared/utils/localStorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { NORMA_API_BASE_URL } from '../routes';
import { SuccessRefreshTokenResponse } from './types';

export const refreshTokenApi = createApi({
  reducerPath: 'refreshTokenApi',
  baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_BASE_URL }),
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
