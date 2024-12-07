import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIngredientsResponse, NormalizedIngredients, MakeOrderRequest, MakeOrderResponse } from './types';
import { NORMA_API_BASE_URL } from '../routes';

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: NORMA_API_BASE_URL }),
  endpoints: (builder) => ({
    getIngredients: builder.query<NormalizedIngredients, void>({
      query: () => ({
        url: 'ingredients',
      }),
      transformResponse: (response: GetIngredientsResponse) =>
        response.data.reduce<NormalizedIngredients>(
          (acc, item) => {
            acc.entities[item._id] = item;
            acc.ids.push(item._id);
            return acc;
          },
          { entities: {}, ids: [] }
        ),
    }),
    makeOrder: builder.mutation<MakeOrderResponse, MakeOrderRequest>({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useMakeOrderMutation } = ingredientsApi;
