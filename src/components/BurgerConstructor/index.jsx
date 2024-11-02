import { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement as CE, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from './OrderDetails';
import { TotalPrice } from './TotalPrice';
import { selectSelectedIngredients, selectIds } from '../../services/selectors/selectedIngredientsSelectors';
import { useMakeOrderMutation } from '../../services/api/normaApi';
import { selectIngredientById, selectIngredientsByIds } from '../../services/selectors/normaApiSelectors';
import { useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '../../services/slices/selectedIngredientsSlice';
import { DragbleElement } from './DragbleElement';

const ConstructorElement = memo(CE);

export const BurgerConstructor = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useDispatch();

  const { bun: bunId, stuffing: stuffingIds } = useSelector(selectSelectedIngredients);
  const selectedIngredientsIds = useSelector(selectIds);

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: ({ id, type }) => dispatch(selectedIngredientsActions.addIngredient({ id, type })),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [orderRequest, { data, isLoading, error }] = useMakeOrderMutation();

  const makeOrder = async () => {
    setIsModalActive(true);
    await orderRequest(selectedIngredientsIds);
  };

  const deactivateModal = () => setIsModalActive(false);

  const orderId = data?.order?.number;

  const bun = useSelector(selectIngredientById(bunId));
  const stuffing = useSelector(selectIngredientsByIds(stuffingIds));

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div
          className={clsx('mb-10', cls.constructorContainer, {
            [cls.overConstructorContainer]: isOver,
          })}
          ref={dropRef}
        >
          <div className={clsx(cls.constructorElement, 'pl-8 mb-4')}>
            {bun && (
              <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
            )}
          </div>
          <div className={cls.withScroll}>
            {stuffing.map((ing, index) => (
              <DragbleElement key={`${ing._id}${index}`} index={index}>
                <ConstructorElement
                  text={ing.name}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={() => dispatch(selectedIngredientsActions.removeIngredient({ index }))}
                />
              </DragbleElement>
            ))}
          </div>
          <div className={clsx(cls.constructorElement, 'pl-8 mt-4')}>
            {bun && (
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
        </div>
        <div className={clsx(cls.total, 'pr-4')}>
          <TotalPrice />
          <Button
            htmlType='button'
            type='primary'
            size='large'
            onClick={makeOrder}
            disabled={selectedIngredientsIds.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalActive && (
        <Modal deactivateModal={deactivateModal}>
          <OrderDetails orderId={orderId} isLoading={isLoading} error={error} />
        </Modal>
      )}
    </>
  );
};
