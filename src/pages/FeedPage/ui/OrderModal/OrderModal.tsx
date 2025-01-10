import { Modal } from '@/components';
import { Paths } from '@/shared/router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedOrder } from '@/services/api/orderFeedApi/types';
import { OrderDetails } from '../OrderDetails/OrderDetails';

type Props = {
  order: EnhancedOrder;
};

export const OrderModal = ({ order }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Paths.FEED_ORDER.replace(':id', order._id), {
      state: { background: Paths.FEED },
      replace: true,
    });

    return () => navigate(Paths.FEED, { replace: true });
  }, [order._id, navigate]);

  const title = `#${order.number}`;

  return (
    <Modal title={title} titleType='digit'>
      <OrderDetails order={order} />
    </Modal>
  );
};
