import cls from './OrderFeed.module.css';
import { OrderCard } from './OrderCard/OrderCard';
import { useTypedSelector } from '@/services';
import { selectOrdersIds } from '@/services/api/orderFeedApi/orderFeedApiSelectors';

export const OrderFeed = () => {
  const ordersIds = useTypedSelector(selectOrdersIds);

  return (
    <div className={cls.orderFeed}>
      <div className={cls.withScroll}>
        <ul className={cls.orderList}>
          {ordersIds.map((id) => (
            <OrderCard id={id} key={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
