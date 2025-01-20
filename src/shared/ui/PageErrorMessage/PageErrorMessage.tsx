import clsx from 'clsx';
import cls from './PageErrorMessage.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
  className?: string;
  hasLogo?: boolean;
}

export const PageErrorMessage = ({ className, hasLogo = false }: Props) => {
  return (
    <div className={clsx(cls.page_error_message, 'text text_type_main-large', className)}>
      {hasLogo && <Logo className={cls.logo} />}
      <p>При загрузке страницы что-то пошло не так. Попробуйте перезагрузить страницу или вернуться позднее.</p>
    </div>
  );
};
