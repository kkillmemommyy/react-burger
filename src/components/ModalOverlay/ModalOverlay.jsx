import cls from './ModalOverlay.module.css'

export const ModalOverlay = ({ children, closeModalHandler }) => {

  return (
    <div className={cls.modalOverlay} onClick={(e) => e.target === e.currentTarget && closeModalHandler()}>
      {children}
    </div>
  );
};
