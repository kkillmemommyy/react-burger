import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import cls from './BurgerIngredients.module.css';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { useGetIngredientsQuery as getIngredients } from '../../services/api/normaApi';
import { getSelectedIngredients } from '../../services/selectors/selectedIngredientsSelectors';
import { getDataInModal } from '../../services/selectors/modalSelectors';
import { Tabs } from './Tabs';
import { IngredientsSection } from './IngredientsSection';

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('buns');
  const [isModalActive, setIsModalActive] = useState(false);

  const { ref: bunsRef, inView: bunsInView } = useInView();
  const { ref: saucesRef, inView: saucesInView } = useInView();
  const { ref: mainRef, inView: mainInView } = useInView();

  const {
    data: { data: ingredients },
  } = getIngredients();
  const selectedIngredients = useSelector(getSelectedIngredients);
  const dataInModal = useSelector(getDataInModal);

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('buns');
    } else if (saucesInView) {
      setCurrentTab('sauces');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const countedIngredients = useMemo(
    () =>
      selectedIngredients.reduce((result, { id }) => {
        result[id] = (result[id] ?? 0) + 1;
        return result;
      }, {}),
    [selectedIngredients]
  );

  const ingredientsByCategories = useMemo(
    () => ({
      buns: ingredients.filter((ing) => ing.type === 'bun'),
      sauces: ingredients.filter((ing) => ing.type === 'sauce'),
      mains: ingredients.filter((ing) => ing.type === 'main'),
    }),
    [ingredients]
  );

  const activateModal = useCallback(() => setIsModalActive(true), []);
  const deactivateModal = () => setIsModalActive(false);

  const ingredientsSections = [
    { categoryId: 'buns', title: 'Булки', ingredients: ingredientsByCategories.buns, ref: bunsRef },
    { categoryId: 'sauces', title: 'Соусы', ingredients: ingredientsByCategories.sauces, ref: saucesRef },
    { categoryId: 'main', title: 'Начинки', ingredients: ingredientsByCategories.mains, ref: mainRef },
  ];

  return (
    <>
      <section className={cls.wrapp}>
        <Tabs currentTab={currentTab} />
        <div className={cls.ingredients}>
          {ingredientsSections.map((section) => (
            <IngredientsSection
              categoryId={section.categoryId}
              title={section.title}
              ingredients={section.ingredients}
              ref={section.ref}
              activateModal={activateModal}
              countedIngredients={countedIngredients}
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
