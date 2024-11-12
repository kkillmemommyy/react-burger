import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import cls from './Tabs.module.css';
import { IngredientType } from '@/shared/types/api';

interface Props {
  currentTab: IngredientType;
}

export const Tabs = memo(({ currentTab }: Props) => {
  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        <li className={cls.nav_item}>
          <a href='#bun'>
            {/* @ts-expect-error onClick is required */}
            <Tab value='bun' active={currentTab === 'bun'}>
              Булки
            </Tab>
          </a>
        </li>
        <li className={cls.nav_item}>
          <a href='#sauce'>
            {/* @ts-expect-error onClick is required */}
            <Tab value='sauce' active={currentTab === 'sauce'}>
              Соусы
            </Tab>
          </a>
        </li>
        <li className={cls.nav_item}>
          <a href='#main'>
            {/* @ts-expect-error onClick is required */}
            <Tab value='main' active={currentTab === 'main'}>
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
    </nav>
  );
});
