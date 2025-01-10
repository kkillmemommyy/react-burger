import cls from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { Paths } from '@/shared/router';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/slices/userSlice/userSelectors';
import { NavItem } from './ui/NavItem/NavItem';

export const AppHeader = () => {
  const user = useTypedSelector(selectUser);

  return (
    <header className={cls.header}>
      <nav className={cls.nav}>
        <NavLink to={Paths.HOME_PAGE} className={cls.logo}>
          <Logo />
        </NavLink>
        <NavItem to={Paths.HOME_PAGE} text='Конструктор' icon={<BurgerIcon type='secondary' />} />
        <NavItem to={Paths.FEED} text='Лента заказов' icon={<ListIcon type='secondary' />} />
        <NavItem
          to={user ? Paths.PROFILE : Paths.LOGIN}
          text={user ? user.name : 'Войти'}
          icon={<ProfileIcon type='secondary' />}
        />
      </nav>
    </header>
  );
};
