import cls from './ModalOverlay.module.css'

export const ModalOverlay = ({children}) => {
  return (
    <div className={cls.ModalOverlay}>
      {children}
    </div>
  );
};
