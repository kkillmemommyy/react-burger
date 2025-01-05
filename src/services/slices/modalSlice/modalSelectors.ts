import { AppState } from "@/services";

export const selectModal = (state: AppState) => state.modal;

export const selectModalType = (state: AppState) => state.modal.modalType;

export const selectModalContent = (state: AppState) => state.modal.modalContent;

export const selectModalIsOpen = (state: AppState) => state.modal.isModalOpen;
