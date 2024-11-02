import { useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement as CE, DragIcon as DI } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from './OrderDetails';
import { TotalPrice } from './TotalPrice';
import { selectSelectedIngredients, selectIds } from '../../services/selectors/selectedIngredientsSelectors';
import { useMakeOrderMutation } from '../../services/api/normaApi';
import { selectIngredientById, selectIngredientsByIds } from '../../services/selectors/normaApiSelectors';
import { useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '../../services/slices/selectedIngredientsSlice';

const ConstructorElement = memo(CE);
const DragIcon = memo(DI);

export const BurgerConstructor = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useDispatch();

  const removeIngredient = (index) => dispatch(selectedIngredientsActions.removeIngredient({ index }));

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

  const makeOrder = useCallback(async () => {
    setIsModalActive(true);
    await orderRequest(selectedIngredientsIds);
  }, [setIsModalActive, orderRequest, selectedIngredientsIds]);

  const deactivateModal = () => setIsModalActive(false);

  const orderId = data?.order?.number;

  const bun = useSelector(selectIngredientById(bunId));
  const stuffing = useSelector(selectIngredientsByIds(stuffingIds));

  const ConstructorContainerClasses = clsx('mb-10', cls.constructorContainer, {
    [cls.overConstructorContainer]: isOver,
  });

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div className={ConstructorContainerClasses} ref={dropRef}>
          <div className={clsx(cls.constructorElement, 'pl-8 mb-4')}>
            {bun && (
              <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
            )}
          </div>
          <div className={cls.withScroll}>
            {stuffing.map((ing, index) => (
              <div className={cls.constructorElement} key={index}>
                <div className={clsx(cls.dragIcon, 'mr-2')}>
                  <DragIcon type='primary' />
                </div>
                <ConstructorElement
                  text={ing.name}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={() => removeIngredient(index)}
                />
              </div>
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
        <TotalPrice makeOrder={makeOrder} />
      </section>
      {isModalActive && (
        <Modal deactivateModal={deactivateModal}>
          <OrderDetails orderId={orderId} isLoading={isLoading} error={error} />
        </Modal>
      )}
    </>
  );
};
