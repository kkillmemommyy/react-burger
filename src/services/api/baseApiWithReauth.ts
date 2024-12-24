import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '..';
import { localStorageGetItem, localStorageSetItem } from '@/shared/utils/localStorage';
import { userActions } from '../slices/userSlice/userSlice';
import { NORMA_API_BASE_URL } from './routes';
import { refreshTokenApi } from './refreshTokenApi/refreshTokenApi';

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
        const refreshResult = await api.dispatch(refreshTokenApi.endpoints.refreshToken.initiate());

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

export const baseApiWithReauth = createApi({
  reducerPath: 'normaApiWithReauth',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
