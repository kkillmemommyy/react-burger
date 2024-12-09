import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetIngredientsResponse, NormalizedIngredients } from './types';
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
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
