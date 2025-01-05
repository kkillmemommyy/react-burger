import { useTypedSelector } from '@/services';
import cls from './OrderCard.module.css';
import { selectOrderById } from '@/services/api/orderFeedApi/orderFeedApiSelectors';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';

interface OrderCardProps {
  id: string;
}

const LIMIT_IMAGES_PER_LINE = 6;

export const OrderCard = ({ id }: OrderCardProps) => {
  const order = useTypedSelector(selectOrderById(id));

  if (!order) {
    return;
  }

  const orderNumber = `#${order.number}`;
  const orderDate = new Date(order.createdAt);
  const orderName = order.name;
  const totalPrice = order.totalPrice;
  const images = order.ingredients
    .slice(0, LIMIT_IMAGES_PER_LINE - 1)
    .map((ing) => ing.image)
    .reverse();
  const numberOfRestIngredients = order.ingredients.length - LIMIT_IMAGES_PER_LINE;
  const lastImage = numberOfRestIngredients > 0 ? order.ingredients[LIMIT_IMAGES_PER_LINE].image : null;
  const status = order.status === 'created' ? 'Создан' : order.status === 'pending' ? 'Готовится' : 'Выполнен';

  return (
    <li className={cls.orderCard}>
      <div className={cls.flexContainer}>
        <span className='text text_type_digits-default'>{orderNumber}</span>
        <FormattedDate date={orderDate} className='text text_type_main-default text_color_inactive' />
      </div>
      <div>
        <div className='mb-2 text text_type_main-medium'>{orderName}</div>
        <div className='text text_type_main-default text_color_success'>{status}</div>
      </div>
      <div className={cls.flexContainer}>
        <ul className={cls.imgsContainer}>
          {lastImage && (
            <li className={cls.imgWrap}>
              <span>{numberOfRestIngredients}</span>
              <img className={clsx(cls.img, cls.lastImg)} src={lastImage} alt='ingredient' />
            </li>
          )}
          {images.map((source, index) => (
            <li className={cls.imgWrap} key={index}>
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
