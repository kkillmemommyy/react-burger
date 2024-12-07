import { memo } from 'react';
import { useTypedSelector, useTypedDispatch } from '@/services';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement as CE, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@/components/Modal/Modal';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { TotalPrice } from './TotalPrice/TotalPrice';
import { selectBun, selectStuffing } from '@/services/selectors/selectedIngredientsSelectors';
import { useMakeOrderMutation } from '@/services/api/ingredientsApi/ingredientsApi';
import { useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '@/services/slices/selectedIngredientsSlice/selectedIngredientsSlice';
import { DragbleElement } from './DragbleElement/DragbleElement';
import { selectModal } from '@/services/selectors/modalSelectors';
import { openModal } from '@/services/slices/modalSlice/modalSlice';
import { AddIngredientPayload } from '@/services/slices/selectedIngredientsSlice/types';

const ConstructorElement = memo(CE);

export const BurgerConstructor = () => {
  const { isModalOpen, modalType, modalContent } = useTypedSelector(selectModal);

  const dispatch = useTypedDispatch();

  const [{ isOver }, dropRef] = useDrop<AddIngredientPayload, unknown, { isOver: boolean }>({
    accept: 'ingredient',
    drop: ({ id, type, name, price, image }) => {
      dispatch(selectedIngredientsActions.addIngredient({ id, type, name, price, image }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [orderRequest, { isLoading, error }] = useMakeOrderMutation();

  const bun = useTypedSelector(selectBun);
  const stuffing = useTypedSelector(selectStuffing);

  const makeOrder = async () => {
    if (!bun) {
      return;
    }
    const ids = [bun.id, ...stuffing.map((s) => s.id)];
    dispatch(openModal({ modalType: 'OrderDetails', modalContent: null }));
    const response = await orderRequest({ ingredients: ids });
    const orderId = response?.data?.order?.number;
    if (orderId) {
      dispatch(openModal({ modalType: 'OrderDetails', modalContent: orderId }));
    }
  };

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div
          className={clsx('mb-10', cls.constructorContainer, {
            [cls.overConstructorContainer]: isOver,
          })}
          ref={dropRef}
        >
          <div className={clsx(cls.constructorElement, bun && 'pl-8 mb-4')}>
            {bun && (
              <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
            )}
          </div>
          <div className={bun ? cls.withScroll : cls.withScrollNotBun}>
            {stuffing.map((ing, index) => (
              <DragbleElement key={ing.createdAt} index={index}>
                <ConstructorElement
                  text={ing.name}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={() => dispatch(selectedIngredientsActions.removeIngredient({ index }))}
                />
              </DragbleElement>
            ))}
          </div>
          <div className={clsx(cls.constructorElement, bun && 'pl-8 mt-4')}>
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
          <Button htmlType='button' type='primary' size='large' onClick={makeOrder} disabled={stuffing.length === 0}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpen && modalType === 'OrderDetails' && (
        <Modal>
          <OrderDetails orderId={modalContent} isLoading={isLoading} error={error} />
        </Modal>
      )}
    </>
  );
};
