import React from 'react';
import cls from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = React.useState('buns');
  const { ref: bunsRef, inView: bunsInView } = useInView({
    threshold: 0,
  });
  const { ref: saucesRef, inView: saucesInView } = useInView({
    threshold: 0,
  });
  const { ref: mainRef, inView: mainInView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (bunsInView) {
      setCurrentTab('buns');
    } else if (saucesInView) {
      setCurrentTab('sauces');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const renderIngredients = (type) => {
    return (
      <ul className={cls.items}>
        {ingredients
          .filter((ing) => ing.type === type)
          .map((ing) => (
            <li className={cls.item} key={ing._id}>
              <img src={ing.image} alt={ing.name} />
              <p className={cls.itemDescription}>
                <span className='text text_type_digits-default mr-3'>{ing.price}</span>
                <CurrencyIcon type='primary' />
              </p>
              <p className={cls.itemDescription}>
                <span className='text text_type_main-default'>{ing.name}</span>
              </p>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <section className={cls.burgerIngredients}>
      <nav className={cls.nav}>
        <ul className={cls.navList}>
          <li className={cls.navItem}>
            <a href='#buns'>
              <Tab value='buns' active={currentTab === 'buns'} onClick={setCurrentTab}>
                Булки
              </Tab>
            </a>
          </li>
          <li className={cls.navItem}>
            <a href='#sauces'>
              <Tab value='sauces' active={currentTab === 'sauces'} onClick={setCurrentTab}>
                Соусы
              </Tab>
            </a>
          </li>
          <li className={cls.navItem}>
            <a href='#main'>
              <Tab value='main' active={currentTab === 'main'} onClick={setCurrentTab}>
                Начинки
              </Tab>
            </a>
          </li>
        </ul>
      </nav>

      <div className={cls.ingredients}>
        <div className={cls.category} ref={bunsRef} id='buns'>
          <h2 className={cls.title}>
            <span className='text text_type_main-large'>Булки</span>
          </h2>
          {renderIngredients('bun')}
        </div>
        <div className={cls.category} ref={saucesRef} id='sauces'>
          <h2 className={cls.title}>
            <span className='text text_type_main-large'>Соусы</span>
          </h2>
          {renderIngredients('sauce')}
        </div>
        <div className={cls.category} ref={mainRef} id='main'>
          <h2 className={cls.title}>
            <span className='text text_type_main-large'>Начинки</span>
          </h2>
          {renderIngredients('main')}
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
