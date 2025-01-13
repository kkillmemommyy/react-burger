import cls from './IngredientPage.module.css';
import { IngredientDetails } from '@/widgets/IngredientDetails/IngredientDetails';

const IngredientPage = () => {
  return (
    <main className={cls.main}>
      <div className={cls.wrap}>
        <IngredientDetails />
      </div>
    </main>
  );
};

export default IngredientPage;
