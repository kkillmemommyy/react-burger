import cls from './MainPage.module.css';
import clsx from 'clsx';
import { BurgerIngredients } from '../../components/BurgerIngredients';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainPage = () => {
  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Соберите бургер</h1>
      <div className={cls.wrap}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
};
