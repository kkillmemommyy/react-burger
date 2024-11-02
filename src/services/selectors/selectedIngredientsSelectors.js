import { createSelector } from '@reduxjs/toolkit';
import { selectIngredients } from './normaApiSelectors';

export const selectSelectedIngredients = (state) => state.selectedIngredients;

export const selectIds = createSelector(selectSelectedIngredients, ({ bun, stuffing }) => {
  const ids = [];
  if (bun) {
    ids.push(bun);
  }
  return ids.concat(stuffing);
});

export const selectIngredientCounts = createSelector(selectSelectedIngredients, (selectedIngredients) => {
  const countedIngredients = {};
  const bun = selectedIngredients.bun;
  const stuffing = selectedIngredients.stuffing;

  if (bun) {
    countedIngredients[bun] = 2;
  }

  stuffing.reduce((result, id) => {
    result[id] = (result[id] ?? 0) + 1;
    return result;
  }, countedIngredients);

  return countedIngredients;
});

export const selectIngredientCountById = (id) =>
  createSelector(selectIngredientCounts, (countedIngredients) => countedIngredients[id] ?? 0);

export const selectTotalPrice = createSelector([selectIds, selectIngredients], (ids, ingredients) =>
  ids.reduce((acc, id) => acc + ingredients[id].price, 0)
);
