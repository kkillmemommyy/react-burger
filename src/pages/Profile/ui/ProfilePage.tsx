import cls from './ProfilePage.module.css';
import clsx from 'clsx';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { useLogoutMutation } from '@/shared/api/auth/authApi';

const ProfilePage = () => {
  const [logoutRequest] = useLogoutMutation();

  const isEditProfile = useMatch(ROUTER_PATHS.PROFILE);
  const isOrderHistory = useMatch(ROUTER_PATHS.PROFILE_ORDERS);

  const renderAsideSubtitle = () => {
    if (isEditProfile) {
      return (
        <p className={clsx(cls.aside_subtitle, 'text text_type_main-default text_color_inactive')}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      );
    } else if (isOrderHistory) {
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

  return (
    <div className={cls.wrap}>
      <aside className={cls.aside}>
        <nav className={cls.aside_nav} aria-label='Меню профиля'>
          <ul role='menu'>
            <li role='menuitem'>
              <NavLink
                to={ROUTER_PATHS.PROFILE}
                end
                className={({ isActive }) =>
                  clsx('text text_type_main-medium text_color_inactive', cls.link, { [cls.active]: isActive })
                }
              >
                Профиль
              </NavLink>
            </li>
            <li role='menuitem'>
              <NavLink
                to={ROUTER_PATHS.PROFILE_ORDERS}
                end
                className={({ isActive }) =>
                  clsx('text text_type_main-medium text_color_inactive', cls.link, { [cls.active]: isActive })
                }
              >
                История заказов
              </NavLink>
            </li>
          </ul>
          <button
            className={clsx('text text_type_main-medium text_color_inactive', cls.btn)}
            aria-label='Выйти из аккаунта'
            onClick={() => logoutRequest()}
          >
            Выход
          </button>
        </nav>

        {renderAsideSubtitle()}
      </aside>

      <Outlet />
    </div>
  );
};

export default ProfilePage;
