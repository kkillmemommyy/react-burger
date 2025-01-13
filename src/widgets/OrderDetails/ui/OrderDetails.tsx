import clsx from 'clsx';
import cls from './OrderDetails.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '@/shared/types/api';
import { getStatusLable } from '@/shared/lib/formatters';
import { Navigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectOrderById } from '@/shared/api/orderFeedApi/orderFeedApiSelectors';
import { ROUTER_PATHS } from '@/shared/models/routes';

type CountedIngredient = Ingredient & { count: number };

export const OrderDetails = () => {
  const { id } = useParams();
  const order = useTypedSelector(selectOrderById(id ?? ''));

  if (!order) {
    return <Navigate to={ROUTER_PATHS.NOT_FOUND} replace />;
  }

  const { name, status, totalPrice, createdAt, ingredients } = order;

  const countedIngs = ingredients.reduce<Record<string, CountedIngredient>>((acc, ing) => {
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
    <>
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
    </>
  );
};
