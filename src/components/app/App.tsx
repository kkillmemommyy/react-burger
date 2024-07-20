import React from 'react';
import cls from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data.js';

function App() {
  return (
    <>
      <AppHeader />
      <main className={cls.main}>
        <h1 className={cls.title}>
          <span className='text text_type_main-large'> Соберите бургер</span>
        </h1>
        <div className={cls.mainContentWrap}>
          <BurgerIngredients ingredients={data}/>
          <section className={cls.burgerConstructor}>2</section>
        </div>
      </main>
    </>
  );
}

export default App;
