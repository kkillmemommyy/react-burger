import cls from './MainPage.module.css';
import clsx from 'clsx';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor';

export const MainPage = () => {
  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Соберите бургер</h1>
      <div className={cls.wrap}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
