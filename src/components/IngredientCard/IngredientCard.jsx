import { memo } from 'react';
import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCard = memo(({ name, price, image, openModal, count, id }) => {
  const openModalHandler = () => openModal(id);

  return (
    <li className={cls.card} onClick={openModalHandler}>
      {count && <Counter count={count} size='default' />}
      <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
      <p className={clsx(cls.card_description, 'mb-1')}>
        <span className='text text_type_digits-default mr-3'>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={clsx(cls.card_description, 'text text_type_main-default')}>{name}</p>
    </li>
  );
});
