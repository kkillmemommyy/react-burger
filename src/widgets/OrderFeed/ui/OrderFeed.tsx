import cls from './OrderFeed.module.css';
import { OrderCard } from './OrderCard/OrderCard';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectOrderIds } from '@/shared/api/orderFeed/orderFeedApiSelectors';

export const OrderFeed = () => {
  const ordersIds = useTypedSelector(selectOrderIds);

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
