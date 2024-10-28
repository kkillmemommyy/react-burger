import { useState, memo } from 'react';
import clsx from 'clsx';
import cls from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = memo(() => {
  const [activeTab, setActiveTab] = useState('constructor');

  return (
    <header className={clsx(cls.header, 'pt-4 pb-4')}>
      <nav className={cls.nav}>
        <a onClick={() => setActiveTab('constructor')} className={cls.logo} href='#'>
          <Logo />
        </a>
        <a
          href='#'
          onClick={() => setActiveTab('constructor')}
          className={clsx(cls.nav_item, activeTab === 'constructor' && cls.active, 'pr-5 pb-4 pt-4 mr-2')}
        >
          <BurgerIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>Конструктор</span>
        </a>
        <a
          href='#'
          onClick={() => setActiveTab('orders')}
          className={clsx(cls.nav_item, activeTab === 'orders' && cls.active, 'pl-5 pr-5 pb-4 pt-4')}
        >
          <ListIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
        </a>
        <a
          href='#'
          onClick={() => setActiveTab('profile')}
          className={clsx(cls.nav_item, activeTab === 'profile' && cls.active, 'pl-5 pb-4 pt-4')}
        >
          <ProfileIcon type='secondary' />
          <span className='text text_type_main-default text_color_inactive ml-2'>Личные кабинет</span>
        </a>
      </nav>
    </header>
  );
});
