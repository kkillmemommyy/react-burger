import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const normaApi = createApi({
  reducerPath: 'normaApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => ({
        url: 'ingredients',
      }),
    }),
    makeOrder: builder.mutation({
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients: ids },
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useMakeOrderMutation } = normaApi;
