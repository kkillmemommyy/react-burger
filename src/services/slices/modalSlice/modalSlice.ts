import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, OpenModalPayload } from './types';

const initialState: ModalState = {
  isModalOpen: false,
  modalType: null,
  modalContent: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: { modalType, modalContent } }: PayloadAction<OpenModalPayload>) => {
      state.isModalOpen = true;
      state.modalType = modalType;
      state.modalContent = modalContent;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.modalContent = null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions = modalSlice.actions;
