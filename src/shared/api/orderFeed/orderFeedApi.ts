import { baseApi } from '../baseApi';
import { NORMA_API_BASE_WSS_URL } from '../routes';
import { SuccessGetOrderFeedResponse } from './types';

type MessageListener = null | ((event: MessageEvent) => void);

export const orderFeedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderFeed: builder.query<SuccessGetOrderFeedResponse, void>({
      query: () => 'orders/all',
      async onCacheEntryAdded(_, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        const ws = new WebSocket(`${NORMA_API_BASE_WSS_URL}/orders/all`);
        let messageListener: MessageListener = null;

        try {
          await cacheDataLoaded;
          messageListener = (event) => {
            const data: SuccessGetOrderFeedResponse = JSON.parse(event.data);

            updateCachedData((draft) => {
              draft.totalToday = data.totalToday;
              draft.total = data.total;
              draft.success = data.success;
              draft.orders = data.orders;
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
  }),
  overrideExisting: false,
});

export const { useGetOrderFeedQuery } = orderFeedApi;
