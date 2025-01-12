import { AppState } from '@/shared/types/reduxTypes';
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
      const { ingredients: ingredientIds, ...other } = order;

      const mappedIngredients = ingredientIds
        .map((id) => ingredients[id])
        .filter(Boolean);

      const bun = mappedIngredients.find((ing) => ing.type === 'bun');
      const otherIngredients = mappedIngredients.filter((ing) => ing.type !== 'bun');

      const transformedIngredients = bun ? [bun, ...otherIngredients] : otherIngredients;

      const totalPrice = (bun?.price ?? 0) + otherIngredients.reduce((acc, ing) => acc + ing.price, 0);

      if (order.status === 'done') {
        acc.completed.push(order.number);
      } else if (order.status === 'pending') {
        acc.pending.push(order.number);
      }

      acc.orders.push({ totalPrice, ingredients: transformedIngredients, ...other });

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

export const selectOrderIds = createSelector(
  selectOrderFeed,
  (orderFeed) => orderFeed?.orders.map((order) => order._id) ?? []
);
