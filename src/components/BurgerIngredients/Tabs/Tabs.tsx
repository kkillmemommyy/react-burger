import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import cls from './Tabs.module.css';
import { IngredientType, Titles } from '@/shared/types/api';

interface Tab {
  type: IngredientType;
  href: string;
  title: Titles;
}

interface Props {
  currentTab: IngredientType;
}

export const Tabs = memo(({ currentTab }: Props) => {
  const tabs: Tab[] = [
    { type: 'bun', href: '#bun', title: Titles.BUN },
    { type: 'sauce', href: '#sauce', title: Titles.SAUCE },
    { type: 'main', href: '#main', title: Titles.MAIN },
  ];

  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        {tabs.map(({ type, href, title }) => (
          <li className={cls.nav_item}>
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
