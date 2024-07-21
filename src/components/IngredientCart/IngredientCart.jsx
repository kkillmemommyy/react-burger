import clsx from 'clsx';
import cls from './IngredientCart.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCart = ({ image, name, price }) => {
  return (
    <li className={cls.card}>
      <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
      <p className={clsx(cls.card_description, 'mb-1')}>
        <span className='text text_type_digits-default mr-3'>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={cls.card_description}>
        <span className='text text_type_main-default'>{name}</span>
      </p>
    </li>
  );
};
