import cls from './OrderPage.module.css';
import { OrderDetails } from '@/widgets/OrderDetails';
import { useTypedSelector } from '@/services';
import { useGetOrderFeedQuery } from '@/services/api/orderFeedApi/orderFeedApi';
import { selectOrderById } from '@/services/api/orderFeedApi/orderFeedApiSelectors';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { Navigate, useParams } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader';

const OrderPage = () => {
  const { id } = useParams();
  const order = useTypedSelector(selectOrderById(id || ''));
  const { isLoading } = useGetOrderFeedQuery(undefined, { skip: !!order });

  if (isLoading) {
    return <Loader />;
  }

  if (!order) {
    return <Navigate to={ROUTER_PATHS.NOT_FOUND} />;
  }

  return (
    <main className={cls.page}>
      <div className={cls.wrap}>
        <h2 className='text text_type_digits-default'>{`#${order.number}`}</h2>
        <OrderDetails order={order} />
      </div>
    </main>
  );
};

export default OrderPage;
