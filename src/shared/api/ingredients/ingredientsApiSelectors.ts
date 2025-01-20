import { ingredientsApi } from './ingredientsApi';
import { createSelector } from '@reduxjs/toolkit';
import { IngredientType } from '@/shared/types/api';

export const selectAll = (state: AppState) =>
  ingredientsApi.endpoints.getIngredients.select()(state).data ?? { entities: {}, ids: [] };

export const selectIngredients = createSelector(selectAll, (state) => state.entities);

export const selectIds = createSelector(selectAll, (state) => state.ids);

export const selectIngredientsByType = (type: IngredientType) =>
  createSelector(selectIngredients, (ingredients) => Object.values(ingredients).filter((ing) => ing.type === type));

export const selectIngredientById = (id: string) => createSelector(selectIngredients, (ingredients) => ingredients[id]);

