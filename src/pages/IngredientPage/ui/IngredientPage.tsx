import { Navigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectIngredientById } from '@/services/api/ingredientsApi/ingredientsApiSelectors';
import { ROUTER_PATHS } from '@/shared/constants/routes';
import cls from './IngredientPage.module.css';
import { clsx } from 'clsx';

const IngredientPage = () => {
  const { id } = useParams();

  const ingredient = useTypedSelector(selectIngredientById(id ?? ''));

  if (!ingredient) {
    return <Navigate to={ROUTER_PATHS.NOT_FOUND} replace />;
  }

  const { proteins, fat, carbohydrates, calories, name, image_large: image } = ingredient;

  return (
    <div className={cls.wrap}>
      <h1 className='text text_type_main-large'>Детали Ингредиента</h1>
      <>
        <img src={image} alt={name} className={clsx(cls.img, 'mb-4')} />
        <p className={clsx(cls.name, 'text text_type_main-medium mb-8')}>{name}</p>
        <div className={clsx(cls.details, 'mb-15')}>
          <div className={cls.detail}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
            <p className='text text_type_digits-default text_color_inactive'>{calories}</p>
          </div>
          <div className={cls.detail}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{proteins}</p>
          </div>
          <div className={cls.detail}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{fat}</p>
          </div>
          <div className={cls.detail}>
            <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{carbohydrates}</p>
          </div>
        </div>
      </>
    </div>
  );
};

export default IngredientPage;
