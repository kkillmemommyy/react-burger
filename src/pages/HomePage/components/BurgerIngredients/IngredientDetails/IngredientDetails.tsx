import clsx from 'clsx';
import cls from './IngredientDetails.module.css';
import { IngredientDetails as IngredientDetailsType} from '@/services/slices/modalSlice/types';

type Props = IngredientDetailsType;

export const IngredientDetails = ({ proteins, fat, carbohydrates, calories, image, name }: Props) => {
  return (
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
  );
};
