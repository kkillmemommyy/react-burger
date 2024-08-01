import { useState } from 'react';
import cls from './MainPage.module.css';
import clsx from 'clsx';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor';

export const MainPage = ({ ingredients }) => {
  const [selectedIngredients] = useState([
    {
      id: '60666c42cc7b410027a1a9b1',
      type: 'bun',
      name: 'Краторная булка N-200i',
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
    {
      id: '60666c42cc7b410027a1a9b9',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    },
    {
      id: '60666c42cc7b410027a1a9b4',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    },
    {
      id: '60666c42cc7b410027a1a9bc',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    },
    {
      id: '60666c42cc7b410027a1a9bb',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    },
    {
      id: '60666c42cc7b410027a1a9bb',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    },
    {
      id: '60666c42cc7b410027a1a9b4',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    },
  ]);

  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Соберите бургер</h1>
      <div className={cls.wrap}>
        <BurgerIngredients ingredients={ingredients} selectedIngredients={selectedIngredients} />
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </div>
    </main>
  );
};
