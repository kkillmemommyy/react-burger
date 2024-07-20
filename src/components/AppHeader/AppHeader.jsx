import clsx from 'clsx';
import cls from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={clsx(cls.header, 'pt-4 pb-4')}>
      <nav className={cls.nav}>
        <a className={cls.logo} href='#'>
          <Logo />
        </a>
        <a href='#' className={clsx(cls.nav_item, cls.active, 'pr-5 pb-4 pt-4 mr-2')}>
          <BurgerIcon type='primary' />
          <span className='text text_type_main-default ml-2'>Конструктор</span>
        </a>
        <a href='#' className={clsx(cls.nav_item, 'pl-5 pr-5 pb-4 pt-4')}>
          <ListIcon type='secondary' />
          <span className='text text_type_main-default ml-2'>Лента заказов</span>
        </a>
        <a href='#' className={clsx(cls.nav_item, 'pl-5 pb-4 pt-4')}>
          <ProfileIcon type='secondary' />
          <span className='text text_type_main-default ml-2'>Личные кабинет</span>
        </a>
      </nav>
    </header>
  );
};

export { AppHeader };
