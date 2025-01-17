import cls from './OrderFeed.module.css';
import { OrderCard } from './OrderCard/OrderCard';
import { Order } from '@/shared/api/orderFeed/types';

interface Props {
  orders: Order[];
}

export const OrderFeed = ({ orders }: Props) => {
  return (
    <div className={cls.orderFeed}>
      <div className={cls.withScroll}>
        <ul className={cls.orderList}>
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
