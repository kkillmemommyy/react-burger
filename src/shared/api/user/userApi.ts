import { baseApiWithReauth } from '../baseApiWithReauth';
import { MakeOrderRequest, MakeOrderResponse, PatchUserRequest, SuccessGetUserResponse } from './types';

export const userApi = baseApiWithReauth.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<SuccessGetUserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
    }),
    patchUser: builder.mutation<SuccessGetUserResponse, PatchUserRequest>({
      query: (form) => ({
        url: 'auth/user',
        method: 'PATCH',
        body: form,
      }),
    }),
    makeOrder: builder.mutation<MakeOrderResponse, MakeOrderRequest>({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserQuery, usePatchUserMutation, useMakeOrderMutation } = userApi;
