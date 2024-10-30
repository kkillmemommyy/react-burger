import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import cls from './BurgerIngredients.module.css';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from './IngredientDetails/IngredientDetails';
import { getDataInModal } from '../../services/selectors/modalSelectors';
import { Tabs } from './Tabs';
import { IngredientsSection } from './IngredientsSection';

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');
  const [isModalActive, setIsModalActive] = useState(false);

  const { ref: bunsRef, inView: bunsInView } = useInView();
  const { ref: saucesRef, inView: saucesInView } = useInView();
  const { ref: mainRef, inView: mainInView } = useInView();

  const dataInModal = useSelector(getDataInModal);

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('bun');
    } else if (saucesInView) {
      setCurrentTab('sauce');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const activateModal = useCallback(() => setIsModalActive(true), []);
  const deactivateModal = () => setIsModalActive(false);

  const ingredientsSections = [
    { category: 'bun', title: 'Булки', ref: bunsRef },
    { category: 'sauce', title: 'Соусы', ref: saucesRef },
    { category: 'main', title: 'Начинки', ref: mainRef },
  ];

  return (
    <>
      <section className={cls.wrapp}>
        <Tabs currentTab={currentTab} />
        <div className={cls.ingredients}>
          {ingredientsSections.map((section) => (
            <IngredientsSection
              category={section.category}
              title={section.title}
              ref={section.ref}
              activateModal={activateModal}
              key={section.category}
            />
          ))}
        </div>
      </section>
      {isModalActive && (
        <Modal title='Детали ингредиента' deactivateModal={deactivateModal}>
          <IngredientDetails {...dataInModal} />
        </Modal>
      )}
    </>
  );
};
