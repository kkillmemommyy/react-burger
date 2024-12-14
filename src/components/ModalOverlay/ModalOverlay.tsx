import { ReactNode, MouseEventHandler } from 'react';
import { useTypedDispatch } from '@/services';
import cls from './ModalOverlay.module.css';
import { modalActions } from '@/services/slices/modalSlice/modalSlice';

interface Props {
  children: ReactNode;
}

export const ModalOverlay = ({ children }: Props) => {
  const dispatch = useTypedDispatch();

  const closeModalHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(modalActions.closeModal());
    }
  };

  return (
    <div className={cls.modalOverlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
