import cls from './ProfilePage.module.css';
import clsx from 'clsx';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { NavLink, Outlet } from 'react-router-dom';
import { useLogoutMutation } from '@/shared/api/auth/authApi';
import { AsideSubtitle } from './AsideSubtitle/AsideSubtitle';

const ProfilePage = () => {
  const [logoutRequest] = useLogoutMutation();

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

        <AsideSubtitle />
      </aside>

      <Outlet />
    </div>
  );
};

export default ProfilePage;
