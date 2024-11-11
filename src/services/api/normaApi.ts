import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIngredientsResponse, NormalizedIngredients, MakeOrderRequest, MakeOrderResponse } from './types';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const normaApi = createApi({
  reducerPath: 'normaApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
      query: (ids) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients: ids },
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useMakeOrderMutation } = normaApi;
