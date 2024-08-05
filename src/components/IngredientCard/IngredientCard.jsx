import clsx from 'clsx';
import cls from './IngredientCard.module.css';
import { useState, useEffect } from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

export const IngredientCard = ({ name, price, id, selectedIngredients, proteins, fat, carbohydrates, calories, image, imageLarge }) => {
  const [count, setCount] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    setCount(selectedIngredients.filter((ing) => ing.id === id).length);
  }, [selectedIngredients, id]);

  const openModalHandler = () => setIsModalActive(true);

  return (
    <>
      <li className={cls.card} onClick={openModalHandler}>
        {!!count && <Counter count={count} size='default' />}
        <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
        <p className={clsx(cls.card_description, 'mb-1')}>
          <span className='text text_type_digits-default mr-3'>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={clsx(cls.card_description, 'text text_type_main-default')}>{name}</p>
      </li>
      {isModalActive && (
        <Modal setIsModalActive={setIsModalActive} title='Детали ингредиента'>
          <IngredientDetails 
            proteins={proteins} 
            fat={fat} 
            carbohydrates={carbohydrates} 
            calories={calories} 
            image={imageLarge} 
            name={name} 
          />
        </Modal>
      )}
    </>
  );
};
