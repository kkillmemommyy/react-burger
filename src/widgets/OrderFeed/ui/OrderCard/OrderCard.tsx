import cls from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { getStatusLable } from '@/shared/lib/formatters';
import { useMatch, useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { Order } from '@/shared/api/orders/types';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectIngredients } from '@/shared/api/ingredients/ingredientsApiSelectors';
import { getFormattedOrder } from '@/shared/lib/formatters';
import FormattedDate from '@/shared/ui/FormattedDate/FormattedDate';

const LIMIT_IMAGES_PER_LINE = 6;

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const navigate = useNavigate();
  const ingredients = useTypedSelector(selectIngredients);

  const isPublicFeed = useMatch(ROUTER_PATHS.FEED);
  const modalPath = isPublicFeed
    ? ROUTER_PATHS.FEED_ORDER.replace(':id', `${order.number}`)
    : ROUTER_PATHS.PROFILE_ORDER.replace(':id', `${order.number}`);

  const formattedOrder = getFormattedOrder(order, ingredients);

  const openModalHandle = () => {
    navigate(modalPath, {
      state: { background: modalPath },
    });
  };

  const orderNumber = `#${formattedOrder.number}`;
  const orderDate = new Date(formattedOrder.createdAt);
  const orderName = formattedOrder.name;
  const totalPrice = formattedOrder.totalPrice;
  const overflowCount = formattedOrder.ingredients.length - LIMIT_IMAGES_PER_LINE;
  const isOverflowItem = (index: number) => index === 0 && overflowCount > 0;

  const ingredientImages = formattedOrder.ingredients
    .slice(0, LIMIT_IMAGES_PER_LINE)
    .map((ing) => ing.image)
    .reverse();

  const status = getStatusLable(order.status);

  return (
    <li className={cls.orderCard} onClick={openModalHandle}>
      <div className={cls.flexContainer}>
        <span className='text text_type_digits-default'>{orderNumber}</span>
        <FormattedDate date={orderDate} />
      </div>
      <div>
        <div className='mb-2 text text_type_main-medium'>{orderName}</div>
        <div className='text text_type_main-default text_color_success'>{status}</div>
      </div>
      <div className={cls.flexContainer}>
        <ul className={cls.ingredientImagesList}>
          {ingredientImages.map((source, index) => (
            <li className={clsx(cls.ingredientImage, { [cls.overflow]: isOverflowItem(index) })} key={index}>
              <span className={clsx(cls.overflowCount, 'text text_type_main-default')}>{`+${overflowCount}`}</span>
              <img className={cls.img} src={source} alt='ingredient' />
            </li>
          ))}
        </ul>
        <div className={cls.flexContainer}>
          <span className='mr-2 text text_type_digits-default'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </li>
  );
};
