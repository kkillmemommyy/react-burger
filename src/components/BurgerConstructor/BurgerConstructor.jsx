import { useState, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';

import { ConstructorElement as CE, DragIcon as DI } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { TotalPrice } from '../TotalPrice/TotalPrice';

import { getSelectedIngredients } from '../../services/selectors/selectedIngredientsSelectors';
import { useMakeOrderMutation } from '../../services/api/normaApi';

const ConstructorElement = memo(CE);
const DragIcon = memo(DI);

export const BurgerConstructor = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const selectedIngredients = useSelector(getSelectedIngredients);

  const [orederRequest, { data, isLoading }] = useMakeOrderMutation();

  const makeOrder = useCallback(async () => {
    setIsModalActive(true);
    const response = await orederRequest(selectedIngredients.map((ing) => ing._id));

    if (response.error) {
      alert('Ошибка при оформление заказа. Попробуйте повторить позднее.');
      return;
    }
  }, [setIsModalActive, orederRequest, selectedIngredients]);

  const totalPrice = selectedIngredients.reduce((acc, ing) => {
    return acc + ing.price;
  }, 0);

  const deactivateModal = () => setIsModalActive(false);

  const orderId = data?.order?.number;

  const bun = selectedIngredients.filter((ing) => ing.type === 'bun')[0];
  const notBun = selectedIngredients.filter((ing) => ing.type !== 'bun');

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div className='mb-10'>
          <div className={clsx(cls.constructorElement, 'pl-8 mb-4')}>
            {bun && <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
          </div>
          <div className={cls.withScroll}>
            {notBun.map((ing, index) => (
              <div className={cls.constructorElement} key={index}>
                <div className={clsx(cls.dragIcon, 'mr-2')}>
                  <DragIcon type='primary' />
                </div>
                <ConstructorElement text={ing.name} price={ing.price} thumbnail={ing.image} />
              </div>
            ))}
          </div>
          <div className={clsx(cls.constructorElement, 'pl-8 mt-4')}>
            {bun && <ConstructorElement type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
          </div>
        </div>
        <TotalPrice makeOrder={makeOrder} totalPrice={totalPrice} />
      </section>
      {isModalActive && (
        <Modal deactivateModal={deactivateModal}>
          <OrderDetails orderId={orderId} isLoading={isLoading} />
        </Modal>
      )}
    </>
  );
};
