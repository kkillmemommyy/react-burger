import { ReactNode, MouseEventHandler } from 'react';
import cls from './ModalOverlay.module.css';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const ModalOverlay = ({ children, onClose }: Props) => {
  const closeModalHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClose && onClose();
    }
  };

  return (
    <div className={cls.overlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
