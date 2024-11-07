import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import cls from './Tabs.module.css';

export const Tabs = memo(({ currentTab }) => {
  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        <li className={cls.nav_item}>
          <a href='#bun'>
            <Tab value='bun' active={currentTab === 'bun'}>
              Булки
            </Tab>
          </a>
        </li>
        <li className={cls.nav_item}>
          <a href='#sauce'>
            <Tab value='sauce' active={currentTab === 'sauce'}>
              Соусы
            </Tab>
          </a>
        </li>
        <li className={cls.nav_item}>
          <a href='#main'>
            <Tab value='main' active={currentTab === 'main'}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
    </nav>
  );
});
