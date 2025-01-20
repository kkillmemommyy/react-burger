import cls from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectUser } from '@/shared/models/slices/user/userSelectors';
import { NavItem } from './NavItem';

export const AppHeader = () => {
  const user = useTypedSelector(selectUser);

  return (
    <header className={cls.header}>
      <nav className={cls.nav}>
        <NavLink to={ROUTER_PATHS.HOME_PAGE} className={cls.logo}>
          <Logo />
        </NavLink>
        <NavItem to={ROUTER_PATHS.HOME_PAGE} text='Конструктор' icon={<BurgerIcon type='secondary' />} />
        <NavItem to={ROUTER_PATHS.FEED} text='Лента заказов' icon={<ListIcon type='secondary' />} />
        <NavItem
          to={user ? ROUTER_PATHS.PROFILE : ROUTER_PATHS.LOGIN}
          text={user ? user.name : 'Войти'}
          icon={<ProfileIcon type='secondary' />}
        />
      </nav>
    </header>
  );
};
