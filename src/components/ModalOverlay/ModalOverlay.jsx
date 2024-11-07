import { useDispatch } from 'react-redux';

import cls from './ModalOverlay.module.css';

import { closeModal } from '../../services/slices/modalSlice';

export const ModalOverlay = ({ children, deactivateModal }) => {
  const dispatch = useDispatch();

  const closeModalHandler = (e) => {
    if (e.target === e.currentTarget) {
      deactivateModal();
      dispatch(closeModal());
    }
  };

  return (
    <div className={cls.modalOverlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
