import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import cls from './Tabs.module.css';
import { IngredientType  } from '@/shared/types/api';

interface Tab {
  type: IngredientType;
  href: string;
  title: 'Булки' | 'Соусы' | 'Начинки';
}

interface Props {
  currentTab: IngredientType;
}

export const Tabs = memo(({ currentTab }: Props) => {
  const tabs: Tab[] = [
    { type: 'bun', href: '#bun', title: 'Булки' },
    { type: 'sauce', href: '#sauce', title: 'Соусы' },
    { type: 'main', href: '#main', title: 'Начинки'},
  ];

  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        {tabs.map(({ type, href, title }) => (
          <li className={cls.nav_item} key={type}>
            <a href={href}>
              {/* @ts-expect-error onClick is required */}
              <Tab type={type} active={currentTab === type}>
                {title}
              </Tab>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
});
