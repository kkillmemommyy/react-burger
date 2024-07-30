import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCard = ({ image, name, price, id, selectedIngredients }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(selectedIngredients.filter((ing) => ing.id === id).length);
  }, [selectedIngredients]);

  return (
    <li className={cls.card}>
      {!!count && <Counter count={count} size='default' />}
      <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
      <p className={clsx(cls.card_description, 'mb-1')}>
        <span className='text text_type_digits-default mr-3'>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={clsx(cls.card_description, 'text text_type_main-default')}>{name}</p>
    </li>
  );
};
