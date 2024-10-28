import { memo } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { openModal } from '../../services/slices/modalSlice';

export const IngredientCard = memo(
  ({ activateModal, name, price, image, count, proteins, fat, carbohydrates, calories, image_large }) => {
    const dispatch = useDispatch();

    const dataForModal = { name, proteins, fat, carbohydrates, calories, image: image_large };

    const openModalHandle = () => {
      dispatch(openModal(dataForModal));
      activateModal();
    };

    return (
      <li className={cls.card} onClick={openModalHandle}>
        {count && <Counter count={count} size='default' />}
        <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
        <p className={clsx(cls.card_description, 'mb-1')}>
          <span className='text text_type_digits-default mr-3'>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={clsx(cls.card_description, 'text text_type_main-default')}>{name}</p>
      </li>
    );
  }
);
