import cls from './ProfilePage.module.css';
import clsx from 'clsx';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '@/services/api/authApi/authApi';
import { EditProfile } from './EditProfile/EditProfile';

const ProfilePage = () => {
  const [logoutRequest] = useLogoutMutation();

  const tabs = [
    { name: 'Профиль', path: ROUTER_PATHS.PROFILE },
    { name: 'История заказов', path: ROUTER_PATHS.PROFILE_ORDERS },
  ];

  return (
    <main className={cls.main}>
      <aside className={clsx('mb-20 mr-15', cls.wrap)}>
        <nav className='mb-15' aria-label='Меню профиля'>
          <ul role='menu'>
            {tabs.map((tab) => (
              <li key={tab.path} role='menuitem'>
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    clsx('text text_type_main-medium text_color_inactive', cls.link, { [cls.active]: isActive })
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className={clsx('text text_type_main-medium text_color_inactive', cls.btn)}
            aria-label='Выйти из аккаунта'
            onClick={() => logoutRequest()}
          >
            Выход
          </button>
        </nav>

        <p className={clsx(cls.p, 'text text_type_main-default text_color_inactive')}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </aside>

      <EditProfile />
    </main>
  );
};

export default ProfilePage;
