import clsx from 'clsx';
import cls from './OrderDetails.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '@/shared/types/api';
import { getFormattedOrder, getStatusLable } from '@/shared/lib/formatters';
import { Navigate, useParams } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { useGetOrderQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectIngredients } from '@/shared/api/ingredients/ingredientsApiSelectors';
import { skipToken } from '@reduxjs/toolkit/query';
import { Loader } from '@/shared/ui/Loader';

type CountedIngredient = Ingredient & { count: number };

export const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderQuery(id ?? skipToken);
  const ingredients = useTypedSelector(selectIngredients);

  if (isLoading) {
    return <Loader/>
  }

  if (!order) {
    return <Navigate to={ROUTER_PATHS.NOT_FOUND} replace />;
  }

  console.log(order)

  const formattedOrder = getFormattedOrder(order, ingredients);

  const { name, status, totalPrice, createdAt, ingredients: unmappedIngredients } = formattedOrder;

  const countedIngs = unmappedIngredients.reduce<Record<string, CountedIngredient>>((acc, ing) => {
    const currentIng = acc[ing._id];
    if (currentIng && currentIng.type !== 'bun') {
      currentIng.count += 1;
      return acc;
    }

    acc[ing._id] = ing.type === 'bun' ? { ...ing, count: 2 } : { ...ing, count: 1 };
    return acc;
  }, {});

  const statusLable = getStatusLable(status);

  return (
    <div className={cls.order_details}>
      <h1 className={clsx(cls.title, 'text text_type_digits-default', 'mb-5')}>{`#${order.number}`}</h1>
      <div className={clsx(cls.flex_wrap, 'mb-15')}>
        <h2 className='text text_type_main-medium mb-3'>{name}</h2>
        <p className='text text_type_main-default text_color_success'>{statusLable}</p>
      </div>
      <div className={clsx(cls.flex_wrap, 'mb-10')}>
        <h2 className='text text_type_main-medium mb-6'>Состав:</h2>
        <div className={cls.with_scroll}>
          <ul className={clsx(cls.ingredient_list, 'mr-6')}>
            {Object.values(countedIngs).map((ing) => (
              <li className={cls.flex_wrap_space_between} key={ing._id}>
                <div className={cls.align_items}>
                  <div className={clsx(cls.img_wrap, 'mr-4')}>
                    <img className={cls.img} src={ing.image} alt='ingredient' />
                  </div>
                  <span className={clsx(cls.ing_name, 'text text_type_main-default')}>{ing.name}</span>
                </div>
                <div className={cls.align_items}>
                  <span className={'text text_type_digits-default mr-2'}>{`${ing.count} x ${ing.price}`}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={clsx(cls.flex_wrap_space_between, 'mb-10')}>
        <FormattedDate date={new Date(createdAt)} className='text text_type_main-default text_color_inactive' />
        <div className={cls.align_items}>
          <span className='text text_type_digits-default mr-2'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};
