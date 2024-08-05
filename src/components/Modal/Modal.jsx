import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import cls from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal');

export const Modal = ({ closeModal, children, title }) => {
  useEffect(() => {
    const closeModalOnEsc = (e) => e.key === 'Escape' && closeModal();

    document.addEventListener('keyup', closeModalOnEsc);
    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [closeModal]);

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div className={clsx(cls.modalWindow, 'pt-10')}>
        <div className={clsx(cls.modalWindow_head, 'pl-10 pr-10')}>
          <h2 className='text text_type_main-large'>{title}</h2>
          <button onClick={closeModal} className={cls.closeIcon} aria-label='close'>
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={cls.modalWindow_content}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};
