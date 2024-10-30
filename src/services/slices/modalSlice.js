import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => payload,
    closeModal: () => null,
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
