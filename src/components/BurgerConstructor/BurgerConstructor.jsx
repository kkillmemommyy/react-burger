import { useMemo } from 'react';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ selectedIngredients, setSelectedIngredients }) => {
  const totalPrice = useMemo(() => {
    return selectedIngredients.reduce((acc, item) => acc + item.price * item.count, 0);
  }, [selectedIngredients]);

  const bun = useMemo(() => {
    return selectedIngredients.filter((ing) => ing.type === 'bun')[0];
  }, [selectedIngredients]);

  const others = useMemo(() => {
    return selectedIngredients.filter((ing) => ing.type !== 'bun');
  }, [selectedIngredients]);

  return (
    <section className={clsx(cls.wrap, 'pl-4')}>
      <div className='mb-10'>
        <div className={clsx(cls.bun, 'pl-8 mb-4')}>
          {bun && <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
        </div>
        <div className={cls.withScroll}>
          {!!others.length && others.map((ing) => 
            (
              <div className={cls.constructorElement}>
                <div className={clsx(cls.dragIcon, 'mr-2')}>
                  <DragIcon type="primary" />
                </div>
                  <ConstructorElement text={ing.name} price={ing.price} thumbnail={ing.image} key={ing.id} />
              </div>
            )
          )}
        </div>
        <div className={clsx(cls.bun, 'pl-8 mt-4')}>
          {bun && <ConstructorElement type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
        </div>
      </div>
      <div className={clsx(cls.total, 'pr-4')}>
        <div className={clsx(cls.price, 'mr-10')}>
          <span className='text text_type_digits-medium mr-2'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType='button' type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
