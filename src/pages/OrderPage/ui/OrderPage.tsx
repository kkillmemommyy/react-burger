import cls from './OrderPage.module.css';
import { OrderDetails } from '@/entities/OrderDetails';
import { useTypedSelector } from '@/services';
import { useGetOrderFeedQuery } from '@/services/api/orderFeedApi/orderFeedApi';
import { selectOrderById } from '@/services/api/orderFeedApi/orderFeedApiSelectors';
import { ROUTER_PATHS } from '@/shared/constants/routes';
import { Navigate, useParams } from 'react-router-dom';

const OrderPage = () => {
  const { id } = useParams();
  const { isLoading } = useGetOrderFeedQuery();
  const order = useTypedSelector(selectOrderById(id || ''));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <Navigate to={ROUTER_PATHS.NOT_FOUND} />;
  }

  return (
    <main className={cls.page}>
      <div className=''>
        <h2>{order.number}</h2>
        <OrderDetails order={order} />
      </div>
    </main>
  );
};

export default OrderPage;
