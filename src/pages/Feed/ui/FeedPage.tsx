import clsx from 'clsx';
import cls from './FeedPage.module.css';
import { AggregateInfo } from './AggregateInfo/AggregateInfo';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';
import { Loader } from '@/shared/ui/Loader';
import { OrderFeed } from './OrderFeed/OrderFeed';
import { Outlet } from 'react-router-dom';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';

const FeedPage = () => {
  const { isLoading, isError } = useGetOrderFeedQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <PageErrorMessage />;
  }

  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Лента заказов</h1>
      <div className={cls.wrap}>
        <OrderFeed />
        <AggregateInfo />
      </div>
      <Outlet />
    </main>
  );
};

export default FeedPage;
