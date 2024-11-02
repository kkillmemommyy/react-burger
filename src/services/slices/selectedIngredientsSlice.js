import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  stuffing: [],
};

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    addIngredient: (state, { payload: { id, type } }) => {
      if (type === 'bun') {
        state.bun = id;
      } else {
        state.stuffing.push(id);
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
