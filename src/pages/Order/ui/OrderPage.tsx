import cls from './OrderPage.module.css';
import { OrderDetails } from '@/widgets/OrderDetails';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { selectOrderById } from '@/shared/api/orderFeed/orderFeedApiSelectors';
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
    <main className={cls.main}>
      <OrderDetails />
    </main>
  );
};

export default OrderPage;
