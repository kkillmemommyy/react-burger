import { memo } from 'react';
import { useTypedSelector, useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement as CE, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@/shared/ui/Modal/ui/Modal';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { TotalPrice } from './TotalPrice/TotalPrice';
import { useMakeOrderMutation } from '@/shared/api/userApi/userApi';
import { useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '@/shared/models/slices/selectedIngredientsSlice/selectedIngredientsSlice';
import { DragbleElement } from './DragbleElement/DragbleElement';
import { selectModal } from '@/shared/models/slices/modalSlice/modalSelectors';
import { modalActions } from '@/shared/models/slices/modalSlice/modalSlice';
import { AddIngredientPayload } from '@/shared/models/slices/selectedIngredientsSlice/types';
import { selectUser } from '@/shared/models/slices/userSlice/userSelectors';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';
import {
  selectBun,
  selectStuffing,
} from '@/shared/models/slices/selectedIngredientsSlice/selectedIngredientsSelectors';

const ConstructorElement = memo(CE);

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [orderRequest, { isLoading, isError }] = useMakeOrderMutation();

  const { isModalOpen, modalType, modalContent } = useTypedSelector(selectModal);
  const user = useTypedSelector(selectUser);

  const bun = useTypedSelector(selectBun);
  const stuffing = useTypedSelector(selectStuffing);
  const isMakeOrderBtnDisabled = !bun || stuffing.length === 0;

  const [{ isOver }, dropRef] = useDrop<AddIngredientPayload, unknown, { isOver: boolean }>({
    accept: 'ingredient',
    drop: ({ id, type, name, price, image }) => {
      dispatch(selectedIngredientsActions.addIngredient({ id, type, name, price, image }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const makeOrder = async () => {
    if (!user) {
      const searchParams = createSearchParams({ redirect: ROUTER_PATHS.HOME_PAGE });
      navigate(`${ROUTER_PATHS.LOGIN}?${searchParams}`);
      return;
    }

    const ids = bun ? [bun.id, ...stuffing.map((s) => s.id)] : stuffing.map((s) => s.id);

    dispatch(modalActions.openModal({ modalType: 'OrderDetails', modalContent: null }));
    dispatch(selectedIngredientsActions.reset());

    const response = await orderRequest({ ingredients: ids });
    const orderId = response?.data?.order?.number;

    if (orderId) {
      dispatch(modalActions.openModal({ modalType: 'OrderDetails', modalContent: orderId }));
    }
  };

  return (
    <>
      <section className={clsx(cls.wrap, 'pl-4')}>
        <div
          className={clsx('mb-10', cls.constructor_container, {
            [cls.constructor_container_over]: isOver,
          })}
          ref={dropRef}
        >
          <div className={clsx({ 'pl-8 mb-4': bun })}>
            {bun && (
              <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />
            )}
          </div>
          <div className={bun ? cls.with_scroll : cls.with_scroll_not_bun}>
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
          <div className={clsx({ 'pl-8 mb-4': bun })}>
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
          <Button htmlType='button' type='primary' size='large' onClick={makeOrder} disabled={isMakeOrderBtnDisabled}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {isModalOpen && modalType === 'OrderDetails' && (
        <Modal>
          <OrderDetails orderId={modalContent} isLoading={isLoading} isError={isError} />
        </Modal>
      )}
    </>
  );
};
