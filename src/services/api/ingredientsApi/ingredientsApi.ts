import { baseApi } from '../baseApi';
import { GetIngredientsResponse, NormalizedIngredients } from './types';

export const ingredientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<NormalizedIngredients, void>({
      query: () => 'ingredients',
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
  overrideExisting: false,
});

export const { useGetIngredientsQuery } = ingredientsApi;
