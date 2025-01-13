import { Modal } from '@/shared/ui/Modal';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedOrder } from '@/shared/api/orderFeedApi/types';
import { OrderDetails } from '@/widgets/OrderDetails';

type Props = {
  order: EnhancedOrder;
};

export const OrderModal = ({ order }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTER_PATHS.FEED_ORDER.replace(':id', order._id), {
      state: { background: ROUTER_PATHS.FEED },
      replace: true,
    });

    return () => navigate(ROUTER_PATHS.FEED, { replace: true });
  }, [order._id, navigate]);

  const title = `#${order.number}`;

  return (
    <Modal title={title} titleType='digit'>
      <OrderDetails />
    </Modal>
  );
};
