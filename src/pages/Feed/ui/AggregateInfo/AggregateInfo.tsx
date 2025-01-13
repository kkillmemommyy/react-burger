import cls from './AggregateInfo.module.css';
import clsx from 'clsx';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import {
  selectCompleted,
  selectPending,
  selectTotal,
  selectTotalToday,
} from '@/shared/api/orderFeed/orderFeedApiSelectors';

export const AggregateInfo = () => {
  const total = useTypedSelector(selectTotal).toLocaleString('ru-RU');
  const totalToday = useTypedSelector(selectTotalToday).toLocaleString('ru-RU');
  const completedOrders = useTypedSelector(selectCompleted).slice(0, 10);
  const pendingOrders = useTypedSelector(selectPending).slice(0, 10);

  return (
    <div className={cls.wrap}>
      <div className={clsx(cls.ordersWrap, 'mb-15')}>
        <div className={cls.ordersContainer}>
          <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
          <ul className={cls.orderNumbers}>
            {completedOrders.map((number) => (
              <li key={number} className={clsx('text text_type_digits-default text_color_success', cls.orderNumber)}>
                {number}
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.ordersContainer}>
          <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
          <ul className={cls.orderNumbers}>
            {pendingOrders.map((number) => (
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
