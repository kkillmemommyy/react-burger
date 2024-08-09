import cls from './ModalOverlay.module.css';

export const ModalOverlay = ({ children, closeModal }) => {
  const closeModalHandler = (e) => e.target === e.currentTarget && closeModal();

  return (
    <div className={cls.modalOverlay} onClick={closeModalHandler}>
      {children}
    </div>
  );
};
