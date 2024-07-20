import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import cls from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCart } from '../IngredientCart/IngredientCart.jsx';

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = useState('buns');
  const { ref: bunsRef, inView: bunsInView } = useInView({
    threshold: 0,
  });
  const { ref: saucesRef, inView: saucesInView } = useInView({
    threshold: 0,
  });
  const { ref: mainRef, inView: mainInView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('buns');
    } else if (saucesInView) {
      setCurrentTab('sauces');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  return (
    <section className={cls.wrapp}>

      <nav className='mb-10'>
        <ul className={cls.nav_items}>
          <li className={cls.nav_item}>
            <a href='#buns'>
              <Tab value='buns' active={currentTab === 'buns'}>
                Булки
              </Tab>
            </a>
          </li>
          <li className={cls.nav_item}>
            <a href='#sauces'>
              <Tab value='sauces' active={currentTab === 'sauces'}>
                Соусы
              </Tab>
            </a>
          </li>
          <li className={cls.nav_item}>
            <a href='#main'>
              <Tab value='main' active={currentTab === 'main'}>
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>

      <div className={cls.ingredients}>
        <div className='mb-10' ref={bunsRef} id='buns'>
          <h2 className='mb-6'>
            <span className='text text_type_main-large'>Булки</span>
          </h2>
          <ul className={clsx(cls.category_items, 'pl-4')}>
            {ingredients
              .filter((ing) => ing.type === 'bun')
              .map((ing) => (
                <IngredientCart ingredient={ing} key={ing._id} />
              ))}
          </ul>
        </div>
        <div className='mb-10' ref={saucesRef} id='sauces'>
          <h2 className='mb-6'>
            <span className='text text_type_main-large'>Соусы</span>
          </h2>
          <ul className={clsx(cls.category_items, 'pl-4')}>
            {ingredients
              .filter((ing) => ing.type === 'sauce')
              .map((ing) => (
                <IngredientCart ingredient={ing} key={ing._id} />
              ))}
          </ul>
        </div>
        <div className='mb-10' ref={mainRef} id='main'>
          <h2 className='mb-6'>
            <span className='text text_type_main-large'>Начинки</span>
          </h2>
          <ul className={clsx(cls.category_items, 'pl-4')}>
            {ingredients
              .filter((ing) => ing.type === 'main')
              .map((ing) => (
                <IngredientCart ingredient={ing} key={ing._id} />
              ))}
          </ul>
        </div>
      </div>
      
    </section>
  );
};

export { BurgerIngredients };
