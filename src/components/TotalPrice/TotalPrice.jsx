import clsx from 'clsx';
import cls from './TotalPrice.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const TotalPrice = ({ totalPrice, makeOrder }) => {
  return (
    <div className={clsx(cls.total, 'pr-4')}>
      <div className={clsx(cls.price, 'mr-10')}>
        <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' size='large' onClick={makeOrder}>
        Оформить заказ
      </Button>
    </div>
  );
};
