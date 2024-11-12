import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import cls from './Tabs.module.css';
import { IngredientType } from '@/shared/types/api';

interface Tab {
  name: IngredientType;
  href: string;
}

interface Props {
  currentTab: IngredientType;
}

export const Tabs = memo(({ currentTab }: Props) => {
  const tabs: Tab[] = [
    { name: 'bun', href: '#bun' },
    { name: 'sauce', href: '#sauce' },
    { name: 'main', href: '#main' },
  ];

  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        {tabs.map(({ name, href }) => (
          <li className={cls.nav_item}>
            <a href={href}>
              {/* @ts-expect-error onClick is required */}
              <Tab value={name} active={currentTab === name}>
                Булки
              </Tab>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});
