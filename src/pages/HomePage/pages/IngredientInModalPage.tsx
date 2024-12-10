import { Modal } from '@/components';
import { useTypedSelector } from '@/services';
import { selectModal } from '@/services/selectors/modalSelectors';
import { IngredientDetails } from '../components/BurgerIngredients/IngredientDetails/IngredientDetails';
import { Navigate } from 'react-router-dom';
import { Paths } from '@/router';

const IngredientPage = () => {
  const { isModalOpen, modalType, modalContent } = useTypedSelector(selectModal);

  if (isModalOpen && modalType === 'IngredientDetails' && modalContent) {
    return (
      <Modal title='Детали ингредиента'>
        <IngredientDetails {...modalContent} />
      </Modal>
    );
  }

  return <Navigate to={Paths.HOME_PAGE} />;
};

export default IngredientPage;
