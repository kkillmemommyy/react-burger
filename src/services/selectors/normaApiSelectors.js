import { normaApi } from '../api/normaApi';
import { createSelector } from '@reduxjs/toolkit';

export const selectAll = (state) => normaApi.endpoints.getIngredients.select()(state).data ?? { entities: {}, ids: [] };

export const selectIngredients = createSelector(selectAll, (state) => state.entities);

export const selectIds = createSelector(selectAll, (state) => state.ids);

export const selectIngredientsByType = (type) =>
  createSelector(selectIngredients, (ingredients) => Object.values(ingredients).filter((ing) => ing.type === type));

export const selectIngredientById = (id) => createSelector(selectIngredients, (ingredients) => ingredients[id]);

