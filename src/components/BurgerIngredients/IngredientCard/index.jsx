import { memo } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { openModal } from '../../../services/slices/modalSlice';
import { useSelector } from 'react-redux';
import { selectIngredientById } from '../../../services/selectors/normaApiSelectors';
import { selectIngredientCountById } from '../../../services/selectors/selectedIngredientsSelectors';
import { useDrag } from 'react-dnd';

export const IngredientCard = memo(({ activateModal, id }) => {
  const dispatch = useDispatch();

  const ingredient = useSelector(selectIngredientById(id));
  const count = useSelector(selectIngredientCountById(id));

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id, type: ingredient.type },
  });

  const openModalHandle = () => {
    const dataForModal = {
      name: ingredient.name,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
      calories: ingredient.calories,
      image: ingredient.image_large,
    };
    dispatch(openModal(dataForModal));
    activateModal();
  };

  return (
    <li className={cls.card} onClick={openModalHandle} ref={dragRef}>
      {count > 0 && <Counter count={count} size='default' />}
      <img className={clsx(cls.card_img, 'mb-1')} src={ingredient.image} alt={ingredient.name} />
      <p className={clsx(cls.card_description, 'mb-1')}>
        <span className='text text_type_digits-default mr-3'>{ingredient.price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={clsx(cls.card_description, 'text text_type_main-default')}>{ingredient.name}</p>
    </li>
  );
});
