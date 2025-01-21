import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, MutableRefObject } from 'react';
import cls from './Tabs.module.css';

interface Props {
  activeTab: 'buns' | 'mains' | 'sauces';
  bunsRef: MutableRefObject<HTMLDivElement | null>;
  saucesRef: MutableRefObject<HTMLDivElement | null>;
  mainsRef: MutableRefObject<HTMLDivElement | null>;
}

export const Tabs = memo(({ activeTab, bunsRef, saucesRef, mainsRef }: Props) => {
  const scrollOptions = {
    block: 'start',
    behavior: 'smooth',
  } as const;

  const scrollTo = (e: string) => {
    switch (e) {
      case 'buns':
        bunsRef.current?.scrollIntoView(scrollOptions);
        break;
      case 'sauces':
        saucesRef.current?.scrollIntoView(scrollOptions);
        break;
      case 'mains':
        mainsRef.current?.scrollIntoView(scrollOptions);
        break;
    }
  };

  return (
    <nav className='mb-10'>
      <ul className={cls.nav_list}>
        <li className={cls.nav_item}>
          <Tab value='buns' active={activeTab === 'buns'} onClick={scrollTo}>
            Булки
          </Tab>
        </li>
        <li className={cls.nav_item}>
          <Tab value='sauces' active={activeTab === 'sauces'} onClick={scrollTo}>
            Соусы
          </Tab>
        </li>
        <li className={cls.nav_item}>
          <Tab value='mains' active={activeTab === 'mains'} onClick={scrollTo}>
            Начинки
          </Tab>
        </li>
      </ul>
    </nav>
  );
});
