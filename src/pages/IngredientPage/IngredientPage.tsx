import { Navigate, useParams } from 'react-router-dom';
import { IngredientDetails } from '../HomePage/components/BurgerIngredients/IngredientDetails/IngredientDetails';
import { useTypedSelector } from '@/services';
import { selectIngredientById } from '@/services/api/ingredientsApi/ingredientsApiSelectors';
import { Paths } from '@/shared/router';
import cls from './IngredientPage.module.css';

const IngredientPage = () => {
  const { id } = useParams();

  const ingredient = useTypedSelector(selectIngredientById(id ?? ''));

  if (!ingredient) {
    return <Navigate to={Paths.NOT_FOUND} replace/>;
  }

  return (
      <div className={cls.wrap}>
        <h1 className='text text_type_main-large'>Детали Ингредиента</h1>
        <IngredientDetails
          proteins={ingredient.proteins}
          fat={ingredient.fat}
          carbohydrates={ingredient.carbohydrates}
          calories={ingredient.calories}
          image={ingredient.image_large}
          name={ingredient.name}
        />
      </div>
  );
};

export default IngredientPage;
