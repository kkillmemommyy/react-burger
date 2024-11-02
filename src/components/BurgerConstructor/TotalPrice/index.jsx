import { memo } from 'react';
import clsx from 'clsx';
import cls from './TotalPrice.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../../../services/selectors/selectedIngredientsSelectors';

export const TotalPrice = memo(({ makeOrder }) => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <div className={clsx(cls.total, 'pr-4')}>
      <div className={clsx(cls.price, 'mr-10')}>
        <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' size='large' onClick={makeOrder} disabled={totalPrice === 0}>
        Оформить заказ
      </Button>
    </div>
  );
});
