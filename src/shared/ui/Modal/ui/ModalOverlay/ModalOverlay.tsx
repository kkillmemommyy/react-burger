import { ReactNode, MouseEventHandler } from 'react';
import { useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import cls from './ModalOverlay.module.css';
import { modalActions } from '@/shared/models/slices/modalSlice/modalSlice';

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
    <div className={cls.overlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
