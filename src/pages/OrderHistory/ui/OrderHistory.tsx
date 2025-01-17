import { OrderFeed } from '@/widgets/OrderFeed';
import cls from './OrderHistory.module.css';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';

const OrderHistory = () => {
  const { isLoading, isError } = useGetOrderFeedQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <PageErrorMessage />;
  }

  return (
    <main className={cls.main}>
      <OrderFeed />
    </main>
  );
};

export default OrderHistory;
