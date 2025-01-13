import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import cls from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './ModalOverlay';

const modalRoot = document.getElementById('modal');

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
    };
    document.addEventListener('keyup', closeModalOnEsc);

    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [onClose]);

  const closeModalHandler = () => {
    onClose && onClose();
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={clsx(cls.modal, 'pt-10')}>
        <button onClick={closeModalHandler} className={cls.close_icon} aria-label='close'>
          <CloseIcon type='primary' />
        </button>
        <div className={cls.modal_content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
