import { normaApi } from '../api/normaApi';
import { createSelector } from '@reduxjs/toolkit';

const getIngredients = (state) => normaApi.endpoints.getIngredients.select()(state)?.data?.data || [];

export const getIngredientsByCategory = (category) =>
  createSelector(getIngredients, (ingredients) => ingredients.filter((ing) => ing.type === category));

export const getIngredient = (id) =>
  createSelector(getIngredients, (ingredients) => ingredients.find((ing) => ing._id === id));
