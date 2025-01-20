import cls from './OrderPage.module.css';
import { OrderDetails } from '@/widgets/OrderDetails';

const OrderPage = () => {
  return (
    <main className={cls.main}>
      <OrderDetails />
    </main>
  );
};

export default OrderPage;
