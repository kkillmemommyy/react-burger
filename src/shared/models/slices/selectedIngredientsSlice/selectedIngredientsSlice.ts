import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedIngredientsState, AddIngredientPayload } from './types';

const initialState: SelectedIngredientsState = {
  bun: null,
  stuffing: [],
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    addIngredient: (state, { payload: { id, type, name, price, image } }: PayloadAction<AddIngredientPayload>) => {
      if (type === 'bun') {
        state.bun = { id, type, name, price, image, createdAt: Date.now() };
      } else {
        state.stuffing.push({ id, type, name, price, image, createdAt: Date.now() });
      }
    },
    removeIngredient: (state, { payload: { index } }: PayloadAction<{ index: number }>) => {
      state.stuffing = state.stuffing.filter((_, ind) => ind !== index);
    },
    moveCard: (
      { stuffing },
      { payload: { dragIndex, dropIndex } }: PayloadAction<{ dragIndex: number; dropIndex: number }>
    ) => {
      const [movedCard] = stuffing.splice(dragIndex, 1);
      stuffing.splice(dropIndex, 0, movedCard);
    },
    rest: (state) => {
      state.bun = null;
      state.stuffing = [];
    },
  },
});

export const selectedIngredientsReducer = selectedIngredientsSlice.reducer;
export const selectedIngredientsActions = selectedIngredientsSlice.actions;
