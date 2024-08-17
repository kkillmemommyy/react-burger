import { useState } from 'react';
import cls from './MainPage.module.css';
import clsx from 'clsx';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor';
import { SelectedIngredientsContext } from '../../services/MainPageContext';

export const MainPage = () => {
  const [selectedBun] = useState([
    {
      _id: '643d69a5c3f7b9001cfa093c',
      type: 'bun',
      name: 'Краторная булка N-200i',
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      type: 'bun',
      name: 'Краторная булка N-200i',
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
  ]);
  const [selectedOther] = useState([
    {
      _id: '643d69a5c3f7b9001cfa0944',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
      name: 'Мясо бессмертных моллюсков Protostomia',
      type: 'main',
      price: 1337,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa0946',
      name: 'Хрустящие минеральные кольца',
      type: 'main',
      price: 300,
      image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    },
    {
      _id: '643d69a5c3f7b9001cfa093f',
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
        <SelectedIngredientsContext.Provider value={{ selectedBun, selectedOther }}>
          <BurgerIngredients />
          <BurgerConstructor />
        </SelectedIngredientsContext.Provider>
      </div>
    </main>
  );
};
