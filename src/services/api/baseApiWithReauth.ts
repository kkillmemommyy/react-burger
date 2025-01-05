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
  let baseQueryResponse = await baseQuery(args, api, extraOptions);

  if (baseQueryResponse.error && baseQueryResponse.error.status === 401) {
    const refreshTokenResponse = await api.dispatch(refreshTokenApi.endpoints.refreshToken.initiate());

    if (refreshTokenResponse.data) {
      baseQueryResponse = await baseQuery(args, api, extraOptions);
    }
  }

  return baseQueryResponse;
};

export const baseApiWithReauth = createApi({
  reducerPath: 'normaApiWithReauth',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
