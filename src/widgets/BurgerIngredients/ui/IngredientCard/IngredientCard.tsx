import { memo } from 'react';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectIngredientById } from '@/shared/api/ingredients/ingredientsApiSelectors';
import { selectIngredientCountById } from '@/shared/models/slices/selectedIngredients/selectedIngredientsSelectors';
import { useDrag } from 'react-dnd';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

export const IngredientCard = memo(({ id }: Props) => {
  const navigate = useNavigate();

  const ingredient = useTypedSelector(selectIngredientById(id));
  const count = useTypedSelector(selectIngredientCountById(id));

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {
      id,
      type: ingredient.type,
      name: ingredient.name,
      price: ingredient.price,
      image: ingredient.image,
    },
  });

  const openModalHandle = () => {
    navigate(ROUTER_PATHS.INGREDIENT.replace(':id', id), {
      state: { background: ROUTER_PATHS.INGREDIENT.replace(':id', id) },
    });
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
