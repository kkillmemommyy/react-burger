import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  stuffing: [],
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    addIngredient: (state, { payload: { id, type, name, price, image } }) => {
      if (type === 'bun') {
        state.bun = { id, type, name, price, image, createdAt: Date.now() };
      } else {
        state.stuffing.push({ id, type, name, price, image, createdAt: Date.now() });
      }
    },
    removeIngredient: (state, { payload: { index } }) => {
      state.stuffing = state.stuffing.filter((_, ind) => ind !== index);
    },
    moveCard: ({ stuffing }, { payload: { dragIndex, dropIndex } }) => {
      const [movedCard] = stuffing.splice(dragIndex, 1);
      stuffing.splice(dropIndex, 0, movedCard);
    },
  },
});

export const selectedIngredientsReducer = selectedIngredientsSlice.reducer;
export const selectedIngredientsActions = selectedIngredientsSlice.actions;
