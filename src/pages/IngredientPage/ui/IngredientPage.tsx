import cls from './IngredientPage.module.css';
import { IngredientDetails } from '@/widgets/IngredientDetails/IngredientDetails';

const IngredientPage = () => {
  return (
    <div className={cls.wrap}>
      <h1 className='text text_type_main-large'>Детали Ингредиента</h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
