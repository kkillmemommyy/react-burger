import clsx from 'clsx';
import cls from './FeedPage.module.css';
import { AggregateInfo } from './AggregateInfo/AggregateInfo';
import { useGetOrderFeedQuery } from '@/services/api/orderFeedApi/orderFeedApi';
import { Loader } from '@/shared/ui/Loader';
import { OrderFeed } from './OrderFeed/OrderFeed';

const FeedPage = () => {
  const { isLoading, isError } = useGetOrderFeedQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className='prerender text text_type_main-large'>
        При загрузке страницы что-то пошло не так. Попробуйте перезагрузить страницу или вернуться позднее.
      </div>
    );
  }

  return (
    <main className={clsx(cls.main, 'pt-10')}>
      <h1 className={clsx(cls.h1, 'mb-5 text text_type_main-large')}>Лента заказов</h1>
      <div className={cls.wrap}>
        <OrderFeed />
        <AggregateInfo />
      </div>
    </main>
  );
};

export default FeedPage;
