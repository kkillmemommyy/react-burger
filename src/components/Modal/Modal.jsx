import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import cls from './Modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

import { closeModal } from '../../services/slices/modalSlice';

const modalRoot = document.getElementById('modal');

export const Modal = ({ children, title, deactivateModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const closeModalOnEsc = (e) => {
      if (e.key === 'Escape') {
        deactivateModal();
        dispatch(closeModal());
      }
    };

    document.addEventListener('keyup', closeModalOnEsc);
    return () => document.removeEventListener('keyup', closeModalOnEsc);
  }, [dispatch, deactivateModal]);

  const closeModalHandler = () => {
    deactivateModal();
    dispatch(closeModal());
  };

  return createPortal(
    <ModalOverlay deactivateModal={deactivateModal}>
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
