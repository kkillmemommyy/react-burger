import cls from './AggregateInfo.module.css';
import clsx from 'clsx';
import { useGetOrderFeedQuery } from '@/shared/api/orderFeed/orderFeedApi';

export const AggregateInfo = () => {
  const { total, totalToday, completedOrders, pendingOrders } = useGetOrderFeedQuery(undefined, {
    selectFromResult: ({ data }) => ({
      total: data?.total.toLocaleString('ru-RU') ?? 0,
      totalToday: data?.totalToday.toLocaleString('ru-RU') ?? 0,
      completedOrders: data?.orders.filter((o) => o.status === 'done').slice(0, 10) ?? [],
      pendingOrders: data?.orders.filter((o) => o.status === 'pending').slice(0, 10) ?? [],
    }),
  });

  return (
    <div className={cls.wrap}>
      <div className={clsx(cls.ordersWrap, 'mb-15')}>
        <div className={cls.ordersContainer}>
          <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
          <ul className={cls.orderNumbers}>
            {completedOrders.map(({ number }) => (
              <li key={number} className={clsx('text text_type_digits-default text_color_success', cls.orderNumber)}>
                {number}
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.ordersContainer}>
          <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
          <ul className={cls.orderNumbers}>
            {pendingOrders.map(({ number }) => (
              <li key={number} className={clsx('text text_type_digits-default', cls.orderNumber)}>
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mb-15'>
        <p className='text text_type_main-medium'>Выполнено за всё время:</p>
        <p className={clsx(cls.totalNumber, 'text text_type_digits-large')}>{total}</p>
      </div>
      <div>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <p className={clsx(cls.totalNumber, 'text text_type_digits-large')}>{totalToday}</p>
      </div>
    </div>
  );
};
