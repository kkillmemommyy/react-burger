import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import cls from './OrderCard.module.css';
import { selectOrderById } from '@/shared/api/orderFeedApi/orderFeedApiSelectors';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { memo } from 'react';
import { useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import { modalActions } from '@/shared/models/slices/modalSlice/modalSlice';
import { selectModal } from '@/shared/models/slices/modalSlice/modalSelectors';
import { getStatusLable } from '@/shared/lib/formatters';
import { OrderModal } from '../OrderModal/OrderModal';

const LIMIT_IMAGES_PER_LINE = 6;

interface OrderCardProps {
  id: string;
}

export const OrderCard = memo(({ id }: OrderCardProps) => {
  const order = useTypedSelector(selectOrderById(id));
  const dispatch = useTypedDispatch();
  const { isModalOpen, modalType, modalContent } = useTypedSelector(selectModal);

  if (!order) {
    return;
  }

  const openModalHandle = () => {
    dispatch(modalActions.openModal({ modalType: 'OrderInfo', modalContent: order }));
  };

  const orderNumber = `#${order.number}`;
  const orderDate = new Date(order.createdAt);
  const orderName = order.name;
  const totalPrice = order.totalPrice;
  const overflowCount = order.ingredients.length - LIMIT_IMAGES_PER_LINE;
  const isOverflowItem = (index: number) => index === 0 && overflowCount > 0;

  const ingredientImages = order.ingredients
    .slice(0, LIMIT_IMAGES_PER_LINE)
    .map((ing) => ing.image)
    .reverse();

  const status = getStatusLable(order.status);

  return (
    <>
      <li className={cls.orderCard} onClick={openModalHandle}>
        <div className={cls.flexContainer}>
          <span className='text text_type_digits-default'>{orderNumber}</span>
          <FormattedDate date={orderDate} className='text text_type_main-default text_color_inactive' />
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
      {isModalOpen && modalType === 'OrderInfo' && modalContent._id === id && <OrderModal order={order} />}
    </>
  );
});
