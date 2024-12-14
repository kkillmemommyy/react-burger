import clsx from 'clsx';
import cls from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { Paths } from '@/router';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';

export const AppHeader = () => {
  const user = useTypedSelector(selectUser);

  return (
    <header className={clsx(cls.header, 'pt-4 pb-4')}>
      <nav className={cls.nav}>
        <NavLink to={Paths.HOME_PAGE} className={cls.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to={Paths.HOME_PAGE}
          className={({ isActive }) => clsx('pr-5 pb-4 pt-4 mr-2', cls.nav_item, { [cls.active]: isActive })}
        >
          <BurgerIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>Конструктор</span>
        </NavLink>
        <NavLink
          to={Paths.FEED}
          className={({ isActive }) => clsx('pr-5 pb-4 pt-4 mr-2', cls.nav_item, { [cls.active]: isActive })}
        >
          <ListIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
        </NavLink>
        <NavLink
          to={user ? Paths.PROFILE : Paths.LOGIN}
          className={({ isActive }) => clsx('pr-5 pb-4 pt-4', cls.nav_item, { [cls.active]: isActive })}
        >
          <ProfileIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>{user ? user.name : 'Войти'}</span>
        </NavLink>
      </nav>
    </header>
  );
};
