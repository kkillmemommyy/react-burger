import { Modal } from '@/widgets/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { useEffect } from 'react';
import { IngredientDetails as IngredientDetailsType } from '@/services/slices/modalSlice/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  modalContent: IngredientDetailsType;
};

export const IngredientModal = ({ modalContent }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTER_PATHS.INGREDIENT.replace(':id', modalContent.id), {
      state: { background: ROUTER_PATHS.HOME_PAGE },
      replace: true,
    });

    return () => navigate(ROUTER_PATHS.HOME_PAGE, { replace: true });
  }, [modalContent.id, navigate]);

  return (
    <Modal title='Детали ингредиента'>
      <IngredientDetails {...modalContent} />
    </Modal>
  );
};
