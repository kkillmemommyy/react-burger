import { ROUTER_PATHS } from '@/shared/models/routes';
import clsx from 'clsx';
import { useMatch } from 'react-router-dom';
import cls from './AsideSubtitle.module.css';

export const AsideSubtitle = () => {
  const isEditProfile = useMatch(ROUTER_PATHS.PROFILE);
  const isOrderHistory = useMatch(ROUTER_PATHS.PROFILE_ORDERS);

  if (isEditProfile) {
    return (
      <p className={clsx(cls.aside_subtitle, 'text text_type_main-default text_color_inactive')}>
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </p>
    );
  }

  if (isOrderHistory) {
    return (
      <p className={clsx(cls.aside_subtitle, 'text text_type_main-default text_color_inactive')}>
        В этом разделе вы можете
        <br />
        посмотреть свою историю заказов
      </p>
    );
  }

  return null;
};
