import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.data = action.payload;
    },
    closeModal: (state) => {
      state.data = null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
