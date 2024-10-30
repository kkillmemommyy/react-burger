import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedIngredients = (state) => state.selectedIngredients;

export const selectIngredientCounts = createSelector(selectSelectedIngredients, (selectedIngredients) =>
  selectedIngredients.reduce((result, { _id }) => {
    result[_id] = (result[_id] ?? 0) + 1;
    return result;
  }, {})
);

export const selectIngredientCountById = (id) =>
  createSelector(selectIngredientCounts, (countedIngredients) => countedIngredients[id] ?? 0);
