import cls from './ModalOverlay.module.css'

export const ModalOverlay = ({ children, closeModalHandler }) => {

  return (
    <div className={cls.modalOverlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
