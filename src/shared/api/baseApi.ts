import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NORMA_API_BASE_URL } from './routes';

const baseQuery = fetchBaseQuery({ baseUrl: NORMA_API_BASE_URL });

export const baseApi = createApi({
  reducerPath: 'normaApi',
  baseQuery,
  endpoints: () => ({}),
});
