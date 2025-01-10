import { Modal } from '@/components';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Paths } from '@/shared/router';
import { useEffect } from 'react';
import { IngredientDetails as IngredientDetailsType } from '@/services/slices/modalSlice/types';
import { useNavigate } from 'react-router-dom';

type Props = {
  modalContent: IngredientDetailsType;
};

export const IngredientModal = ({ modalContent }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Paths.INGREDIENT.replace(':id', modalContent.id), {
      state: { background: Paths.HOME_PAGE },
      replace: true,
    });

    return () => navigate(Paths.HOME_PAGE, { replace: true });
  }, [modalContent.id, navigate]);

  return (
    <Modal title='Детали ингредиента'>
      <IngredientDetails {...modalContent} />
    </Modal>
  );
};
