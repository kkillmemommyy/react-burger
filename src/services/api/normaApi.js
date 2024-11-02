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
      transformResponse: (response) => {
        const normalizedData = response.data.reduce(
          (acc, item) => {
            acc.entities[item._id] = item;
            acc.ids.push(item._id);
            return acc;
          },
          { entities: {}, ids: [] }
        );

        return normalizedData;
      },
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
