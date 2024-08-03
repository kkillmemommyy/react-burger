import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx'
import cls from './Modal.module.css';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal');

export const Modal = ({ setIsModalActive, children, title }) => {
  const closeModalHandler = () => setIsModalActive(false);
  const closeModalOnEscHandler = (e) => e.key === 'Escape' && closeModalHandler();

  useEffect(() => {
    document.addEventListener('keyup', closeModalOnEscHandler);
    return () => document.removeEventListener('keyup', closeModalOnEscHandler);
  })

  return createPortal(
    (
      <ModalOverlay closeModalHandler={closeModalHandler}>
        <div className={clsx(cls.modalWindow, 'pt-10')} onClick={(e) => e.stopPropagation()}>
          <div className={clsx(cls.modalWindow_head, 'pl-10 pr-10')}>
            <h2 className='text text_type_main-large'>{title}</h2>
            <button onClick={closeModalHandler} className={cls.closeIcon}>
              <CloseIcon type="primary" />
            </button>
          </div>
          <div className={cls.modalWindow_content}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
};
