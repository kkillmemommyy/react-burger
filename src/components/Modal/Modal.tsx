import { useEffect, ReactNode } from 'react';
import { useTypedDispatch } from '@/services';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import cls from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { modalActions } from '@/services/slices/modalSlice/modalSlice';

const modalRoot = document.getElementById('modal');

interface Props {
  children: ReactNode;
  title?: string;
}

export const Modal = ({ children, title }: Props) => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(modalActions.closeModal());
      }
    };

    document.addEventListener('keyup', closeModalOnEsc);
    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [dispatch]);

  const closeModalHandler = () => dispatch(modalActions.closeModal());

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay>
      <div className={clsx(cls.modalWindow, 'pt-10')}>
        <div className={clsx(cls.modalWindow_head, 'pl-10 pr-10')}>
          <h2 className='text text_type_main-large'>{title}</h2>
          <button onClick={closeModalHandler} className={cls.closeIcon} aria-label='close'>
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={cls.modalWindow_content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
