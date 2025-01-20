import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedIngredients = (state: AppState) => state.selectedIngredients;

export const selectBun = (state: AppState) => state.selectedIngredients.bun;
export const selectStuffing = (state: AppState) => state.selectedIngredients.stuffing;

export const selectCountedIngredients = createSelector([selectBun, selectStuffing], (bun, stuffing) => {
  const countedIngredients: Record<string, number> = {};

  if (bun) {
    countedIngredients[bun.id] = 2;
  }

  stuffing.reduce((result, { id }) => {
    result[id] = (result[id] ?? 0) + 1;
    return result;
  }, countedIngredients);

  return countedIngredients;
});

export const selectIngredientCountById = (id: string) =>
  createSelector(selectCountedIngredients, (countedIngredients) => countedIngredients[id] ?? 0);

export const selectTotalPrice = createSelector([selectBun, selectStuffing], (bun, stuffing) => {
  let totalPrice = 0;
  if (bun) {
    totalPrice += bun.price;
  }
  return stuffing.reduce((acc, { price }) => acc + price, totalPrice);
});
