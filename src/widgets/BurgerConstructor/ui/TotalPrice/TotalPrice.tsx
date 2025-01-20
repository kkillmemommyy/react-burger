import { memo } from 'react';
import clsx from 'clsx';
import cls from './TotalPrice.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/shared/models/slices/selectedIngredients/selectedIngredientsSelectors';

export const TotalPrice = memo(() => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className={clsx(cls.price, 'mr-10')}>
      <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
      <CurrencyIcon type='primary' />
    </div>
  );
});
