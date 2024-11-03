import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedIngredients = (state) => state.selectedIngredients;

export const selectBun = (state) => state.selectedIngredients.bun;
export const selectStuffing = (state) => state.selectedIngredients.stuffing;

export const selectIngredientCounts = createSelector([selectBun, selectStuffing], (bun, stuffing) => {
  const countedIngredients = {};

  if (bun) {
    countedIngredients[bun.id] = 2;
  }

  stuffing.reduce((result, { id }) => {
    result[id] = (result[id] ?? 0) + 1;
    return result;
  }, countedIngredients);

  return countedIngredients;
});

export const selectIngredientCountById = (id) =>
  createSelector(selectIngredientCounts, (countedIngredients) => countedIngredients[id] ?? 0);

export const selectTotalPrice = createSelector([selectBun, selectStuffing], (bun, stuffing) => {
  let totalPrice = 0;
  if (bun) {
    totalPrice += bun.price;
  }
  return stuffing.reduce((acc, { price }) => acc + price, totalPrice);
});
