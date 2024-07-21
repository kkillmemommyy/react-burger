import clsx from 'clsx';
import cls from './IngredientCart.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCart = ({ image, name, price, id, type, selectedIngredients, setSelectedIngredients }) => {
  const currentIng = selectedIngredients.find((ing) => ing.id === id);

  const onClickHandler = () => {
    if (type === 'bun') {
      const notBuns = selectedIngredients.filter((ing) => ing.type !== 'bun');
      setSelectedIngredients([...notBuns, { image, name, price, id, type, count: 2 }]);
    } else {
      const otherIng = selectedIngredients.filter((ing) => ing.id !== id);
      const currentIngCount = currentIng?.count ?? 0;
      setSelectedIngredients([...otherIng, {image, name, price, id, type, count: currentIngCount + 1}]);
    }
  };

  return (
    <li className={cls.card} onClick={onClickHandler}>
      {currentIng && <Counter count={currentIng.count} size='default'></Counter>}
      <img className={clsx(cls.card_img, 'mb-1')} src={image} alt={name} />
      <p className={clsx(cls.card_description, 'mb-1')}>
        <span className='text text_type_digits-default mr-3'>{price}</span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={cls.card_description}>
        <span className='text text_type_main-default'>{name}</span>
      </p>
    </li>
  );
};
