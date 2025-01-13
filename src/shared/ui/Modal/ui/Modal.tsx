import { useEffect, ReactNode } from 'react';
import { useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import cls from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from './ModalOverlay';
import { modalActions } from '@/shared/models/slices/modalSlice/modalSlice';

const modalRoot = document.getElementById('modal');

interface Props {
  children: ReactNode;
  title?: string;
  titleType?: 'text' | 'digit';
  onClose?: () => void;
}

export const Modal = ({ children, title, onClose, titleType = 'text' }: Props) => {
  const dispatch = useTypedDispatch();

  const titleClass = titleType === 'text' ? 'text text_type_main-large' : 'text text_type_digits-default';

  useEffect(() => {
    const closeModalOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(modalActions.closeModal());
        onClose && onClose();
      }
    };
    document.addEventListener('keyup', closeModalOnEsc);

    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [dispatch, onClose]);

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
    onClose && onClose();
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={clsx(cls.modal, 'pt-10')}>
        <div className={clsx(cls.modal_head, 'pl-10 pr-10')}>
          <h2 className={titleClass}>{title}</h2>
          <button onClick={closeModalHandler} className={cls.close_icon} aria-label='close'>
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={cls.modal_content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
