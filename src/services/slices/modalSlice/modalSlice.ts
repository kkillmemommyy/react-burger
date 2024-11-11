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
      [state.isModalOpen, state.modalType, state.modalContent] = [true, modalType, modalContent];
    },
    closeModal: (state) => {
      [state.isModalOpen, state.modalType, state.modalContent] = [false, null, null];
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
