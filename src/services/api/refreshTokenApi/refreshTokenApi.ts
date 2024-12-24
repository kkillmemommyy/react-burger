import { userActions } from '@/services/slices/userSlice/userSlice';
import { localStorageGetItem, localStorageSetItem } from '@/shared/utils/localStorage';
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
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const {
          data: { accessToken, refreshToken },
        } = await queryFulfilled;

        localStorageSetItem('refreshToken', refreshToken);
        dispatch(userActions.setAccessToken({ accessToken }));
      },
    }),
  }),
});
