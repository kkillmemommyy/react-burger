import { Modal } from '@/components';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Paths } from '@/router';
import { useEffect } from 'react';
import { IngredientDetails as IngredientDetailsType } from '@/services/slices/modalSlice/types';

type Props = {
  modalContent: IngredientDetailsType;
};

export const IngredientModal = ({ modalContent }: Props) => {

  useEffect(() => {
    window.history.replaceState(null, '', Paths.INGREDIENT.replace(':id', modalContent.id));

    return () => window.history.replaceState(null, '', Paths.HOME_PAGE);
  }, [modalContent.id]);

  return (
    <Modal title='Детали ингредиента'>
      <IngredientDetails {...modalContent} />
    </Modal>
  );
};
