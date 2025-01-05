import { AppState } from '@/services';
import { orderFeedApi } from './orderFeedApi';
import { createSelector } from '@reduxjs/toolkit';
import { selectIngredients } from '../ingredientsApi/ingredientsApiSelectors';
import { EnhancedOrderFeed } from './types';

const selectOrderFeed = (state: AppState) => orderFeedApi.endpoints.getOrderFeed.select()(state).data;

const selectEnhancedOrderFeed = createSelector([selectIngredients, selectOrderFeed], (ingredients, orderFeed) => {
  if (!orderFeed) {
    return { total: 0, totalToday: 0, orders: [], pending: [], completed: [] };
  }

  return orderFeed.orders.reduce<Omit<EnhancedOrderFeed, 'success'>>(
    (acc, order) => {
      if (order.status === 'done') {
        acc.completed.push(order.number);
      } else if (order.status === 'pending') {
        acc.pending.push(order.number);
      }

      const { ingredients: ingredientsIds, ...other } = order;

      let totalPrice = 0;
      const mappeddIngredients = ingredientsIds.filter(Boolean).map((id) => {
        const ing = ingredients[id];
        totalPrice += ing.price;
        return ing;
      });

      acc.orders.push({ totalPrice, ingredients: mappeddIngredients, ...other });

      return acc;
    },
    {
      total: orderFeed.total,
      totalToday: orderFeed.totalToday,
      pending: [],
      completed: [],
      orders: [],
    }
  );
});

export const selectPending = createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.pending);
export const selectCompleted = createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.completed);
export const selectOrders = createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.orders);
export const selectTotal = createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.total);
export const selectTotalToday = createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.totalToday);

export const selectOrderById = (id: string) =>
  createSelector(selectEnhancedOrderFeed, (orderFeed) => orderFeed.orders.find((o) => o._id === id));

export const selectOrdersIds = createSelector(
  selectOrderFeed,
  (orderFeed) => orderFeed?.orders.map((order) => order._id) ?? []
);
