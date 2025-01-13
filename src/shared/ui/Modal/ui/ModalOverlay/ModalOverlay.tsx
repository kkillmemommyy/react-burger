import { ReactNode, MouseEventHandler } from 'react';
import { useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import cls from './ModalOverlay.module.css';
import { modalActions } from '@/shared/models/slices/modalSlice/modalSlice';

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

export const ModalOverlay = ({ children, onClose }: Props) => {
  const dispatch = useTypedDispatch();

  const closeModalHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(modalActions.closeModal());
      onClose && onClose();
    }
  };

  return (
    <div className={cls.overlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
