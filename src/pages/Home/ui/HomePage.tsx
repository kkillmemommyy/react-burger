import cls from './HomePage.module.css';
import clsx from 'clsx';
import { BurgerIngredients } from '@/widgets/BurgerIngredients/ui/BurgerIngredients';
import { BurgerConstructor } from '@/widgets/BurgerConstructor/ui/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <main className={cls.main}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Соберите бургер</h1>
      <div className={cls.wrap}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
      <Outlet />
    </main>
  );
};

export default HomePage;
