import cls from './OrderPage.module.css';
import { OrderDetails } from '@/widgets/OrderDetails';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeedApi/orderFeedApi';
import { selectOrderById } from '@/shared/api/orderFeedApi/orderFeedApiSelectors';
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
      <div className={cls.wrap}>
        <OrderDetails />
      </div>
    </main>
  );
};

export default OrderPage;
