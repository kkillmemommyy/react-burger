import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import cls from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ selectedIngredients }) => {
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const newTotalPrice = selectedIngredients.reduce((acc, ing) => {
      return acc + ing.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedIngredients])

  const bun = selectedIngredients.find(ing => ing.type === 'bun');
  const other = selectedIngredients.filter(ing => ing.type !== 'bun');

  return (
    <section className={cls.wrap}>
      <div className='pl-4'>
        <div className='mb-10'>
          <div className={clsx(cls.constructorElement, 'pl-8 mb-4')}>
            {!!Object.keys(bun).length && <ConstructorElement type='top' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
          </div>
          <div className={cls.withScroll}>
            {other.map(ing => (
               <div className={cls.constructorElement} key={uuidv4()}>
                <div className={clsx(cls.dragIcon, 'mr-2')}><DragIcon type="primary" /></div>
                <ConstructorElement text={ing.name} price={ing.price} thumbnail={ing.image}/>
               </div>
            ))}
          </div>
          <div className={clsx(cls.constructorElement, 'pl-8 mt-4')}>
            {!!Object.keys(bun).length && <ConstructorElement type='bottom' isLocked={true} text={bun.name} price={bun.price} thumbnail={bun.image} />}
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
      </div>
    </section>
  );
};
