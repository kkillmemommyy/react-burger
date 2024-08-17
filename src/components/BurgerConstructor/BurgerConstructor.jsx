import { useState, useContext } from 'react';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { TotalPrice } from '../TotalPrice/TotalPrice';
import { SelectedIngredientsContext } from '../../services/MainPageContext';

const API_URL = 'https://norma.nomoreparties.space/api/orders';

export const BurgerConstructor = () => {
  const { selectedBun, selectedOther } = useContext(SelectedIngredientsContext);

  const [isModalActive, setIsModalActive] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [hasOrderError, setHasOrderError] = useState(false);

  const totalPrice = [...selectedBun, ...selectedOther].reduce((acc, ing) => {
    return acc + ing.price;
  }, 0);

  const closeModal = () => setIsModalActive(false);

  const makeOrder = async () => {
    try {
      setHasOrderError(false);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: [...selectedBun, ...selectedOther].map((ing) => ing._id) }),
      });

      if (!response.ok) {
        throw new Error('Error in order');
      }

      const data = await response.json();
      setOrderId(data.order.number);
      setIsModalActive(true);
    } catch {
      setHasOrderError(true);
    }
  };

  const bun = selectedBun[0];

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div className='mb-10'>
          <div className={clsx(cls.constructorElement, 'pl-8 mb-4')}>
            {bun && <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
          </div>
          <div className={cls.withScroll}>
            {selectedOther.map((ing, index) => (
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
      {isModalActive && !hasOrderError && orderId && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </>
  );
};
