import { OrderFeed } from '@/widgets/OrderFeed';
import cls from './OrderHistory.module.css';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';
import { Outlet } from 'react-router-dom';
import { useGetUserOrdersQuery } from '@/shared/api/user/userApi';
import clsx from 'clsx';

const OrderHistory = () => {
  const { data, isLoading, isError, isSuccess } = useGetUserOrdersQuery();

  if (isLoading) {
    return (
      <Loader
        center={false} 
        className={clsx(cls.loader, cls.flex_center)}
        type='text'
        text='Загружаем ваши заказы'
      />
    );
  }

  if (isError || !isSuccess) {
    return <PageErrorMessage />;
  }

  const hasOrderHistory = data.orders.length > 0;

  return (
    <>
      <main className={clsx(cls.main, { [cls.flex_center]: !hasOrderHistory })}>
        {hasOrderHistory ? (
          <OrderFeed orders={data.orders} />
        ) : (
          <p className={'text text_type_main-medium'}>История пуста</p>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default OrderHistory;
