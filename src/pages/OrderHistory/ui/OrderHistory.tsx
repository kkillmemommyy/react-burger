import { OrderFeed } from '@/widgets/OrderFeed';
import cls from './OrderHistory.module.css';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectAccessToken } from '@/shared/models/slices/user/userSelectors';
import { Outlet } from 'react-router-dom';

const OrderHistory = () => {
  const token = useTypedSelector(selectAccessToken);
  const { data, isLoading, isError, isSuccess } = useGetOrderFeedQuery(token?.replace('Bearer ', ''));

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !isSuccess) {
    return <PageErrorMessage />;
  }

  return (
    <>
      <main className={cls.main}>
        <OrderFeed orders={data.orders} />
      </main>
      <Outlet />
    </>
  );
};

export default OrderHistory;
