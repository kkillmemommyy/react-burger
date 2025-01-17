import clsx from 'clsx';
import cls from './FeedPage.module.css';
import { AggregateInfo } from './AggregateInfo/AggregateInfo';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { Loader } from '@/shared/ui/Loader';
import { OrderFeed } from '@/widgets/OrderFeed';
import { Outlet } from 'react-router-dom';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';

const FeedPage = () => {
  const { data, isLoading, isError, isSuccess } = useGetOrderFeedQuery();

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  if (isError) {
    return <PageErrorMessage />;
  }

  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Лента заказов</h1>
      <div className={cls.wrap}>
        <OrderFeed orders={data?.orders} />
        <AggregateInfo />
      </div>
      <Outlet />
    </main>
  );
};

export default FeedPage;
