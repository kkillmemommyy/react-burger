import { OrderFeed } from '@/widgets/OrderFeed';
import cls from './OrderHistory.module.css';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';
import { Outlet } from 'react-router-dom';
import { useGetUserOrdersQuery } from '@/shared/api/user/userApi';

const OrderHistory = () => {
  const { data, isLoading, isError, isSuccess } = useGetUserOrdersQuery();

  if (isLoading) {
    return <Loader center={false} className={cls.loader} type='text' text='Загружаем ваши заказы' />;
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
