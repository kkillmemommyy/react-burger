import { baseApiWithReauth } from '../base/baseApiWithReauth';
import { NORMA_API_BASE_WSS_URL } from '../routes';
import {
  GetUserOrdersResponse,
  MakeOrderRequest,
  MakeOrderResponse,
  PatchUserRequest,
  SuccessGetUserResponse,
} from './types';

type MessageListener = null | ((event: MessageEvent) => void);

export const userApi = baseApiWithReauth.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<SuccessGetUserResponse, void>({
      query: () => ({
        url: 'auth/user',
        method: 'GET',
      }),
    }),
    getUserOrders: builder.query<GetUserOrdersResponse, void>({
      query: () => 'orders',
      transformResponse: (response: GetUserOrdersResponse) => {
        return { ...response, orders: response.orders.reverse() };
      },
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
        const accessToken = (getState() as AppState).user.accessToken?.replace('Bearer ', '');
        const ws = new WebSocket(`${NORMA_API_BASE_WSS_URL}/orders?token=${accessToken}`);
        let messageListener: MessageListener = null;
        
        try {
          await cacheDataLoaded;
          messageListener = (event) => {
            const data: GetUserOrdersResponse = JSON.parse(event.data);

            updateCachedData((draft) => {
              draft.totalToday = data.totalToday;
              draft.total = data.total;
              draft.success = data.success;
              draft.orders = data.orders.reverse();
            });
          };
          ws.addEventListener('message', messageListener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved;
        if (messageListener) {
          ws.removeEventListener('message', messageListener);
        }
        ws.close();
      },
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

export const { useGetUserQuery, usePatchUserMutation, useMakeOrderMutation, useGetUserOrdersQuery } = userApi;
