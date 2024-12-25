import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '..';
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
    const refreshResponse = await api.dispatch(refreshTokenApi.endpoints.refreshToken.initiate());

    if (refreshResponse.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApiWithReauth = createApi({
  reducerPath: 'normaApiWithReauth',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
