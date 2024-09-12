import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import clsx from 'clsx';
import cls from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from '../IngredientCard/IngredientCard';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

import { useGetIngredientsQuery as getIngredients } from '../../services/api/burgersApi';
import { getSelectedIngredients } from '../../services/selectors/selectedIngredientsSelectors';
import { getDataInModal } from '../../services/selectors/modalSelectors';

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
      selectedIngredients.reduce((result, { _id }) => {
        result[_id] = (result[_id] ?? 0) + 1;
        return result;
      }, {}),
    [selectedIngredients]
  );

  const deactivateModal = () => setIsModalActive(false);
  const activateModal = useCallback(() => setIsModalActive(true), []);

  return (
    <>
      <section className={cls.wrapp}>
        <nav className='mb-10'>
          <ul className={cls.nav_items}>
            <li className={cls.nav_item}>
              <a href='#buns'>
                <Tab value='buns' active={currentTab === 'buns'}>
                  Булки
                </Tab>
              </a>
            </li>
            <li className={cls.nav_item}>
              <a href='#sauces'>
                <Tab value='sauces' active={currentTab === 'sauces'}>
                  Соусы
                </Tab>
              </a>
            </li>
            <li className={cls.nav_item}>
              <a href='#main'>
                <Tab value='main' active={currentTab === 'main'}>
                  Начинки
                </Tab>
              </a>
            </li>
          </ul>
        </nav>

        <div className={cls.ingredients}>
          <div className='mb-10' ref={bunsRef} id='buns'>
            <h2 className='mb-6 text text_type_main-medium'>Булки</h2>
            <ul className={clsx(cls.category_items, 'pl-4')}>
              {ingredients
                .filter((ing) => ing.type === 'bun')
                .map((ing) => (
                  <IngredientCard
                    activateModal={activateModal}
                    proteins={ing.proteins}
                    fat={ing.fat}
                    carbohydrates={ing.carbohydrates}
                    calories={ing.calories}
                    image_large={ing.image_large}
                    image={ing.image}
                    name={ing.name}
                    price={ing.price}
                    count={countedIngredients[ing._id]}
                    key={ing._id}
                  />
                ))}
            </ul>
          </div>
          <div className='mb-10' ref={saucesRef} id='sauces'>
            <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
            <ul className={clsx(cls.category_items, 'pl-4')}>
              {ingredients
                .filter((ing) => ing.type === 'sauce')
                .map((ing) => (
                  <IngredientCard
                    activateModal={activateModal}
                    proteins={ing.proteins}
                    fat={ing.fat}
                    carbohydrates={ing.carbohydrates}
                    calories={ing.calories}
                    image_large={ing.image_large}
                    image={ing.image}
                    name={ing.name}
                    price={ing.price}
                    count={countedIngredients[ing._id]}
                    key={ing._id}
                  />
                ))}
            </ul>
          </div>
          <div className='mb-10' ref={mainRef} id='main'>
            <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
            <ul className={clsx(cls.category_items, 'pl-4')}>
              {ingredients
                .filter((ing) => ing.type === 'main')
                .map((ing) => (
                  <IngredientCard
                    activateModal={activateModal}
                    proteins={ing.proteins}
                    fat={ing.fat}
                    carbohydrates={ing.carbohydrates}
                    calories={ing.calories}
                    image_large={ing.image_large}
                    image={ing.image}
                    name={ing.name}
                    price={ing.price}
                    count={countedIngredients[ing._id]}
                    key={ing._id}
                  />
                ))}
            </ul>
          </div>
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
