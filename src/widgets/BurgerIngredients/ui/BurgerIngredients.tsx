import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import cls from './BurgerIngredients.module.css';
import { Tabs } from './Tabs/Tabs';
import { IngredientsSection } from './IngredientsSection/IngredientsSection';

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<'buns' | 'mains' | 'sauces'>('buns');

  const { ref: bunsInViewRef, inView: bunsInView } = useInView();
  const { ref: saucesInViewRef, inView: saucesInView } = useInView();
  const { ref: mainsInViewRef, inView: mainInView } = useInView();

  const bunsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);

  const setBunsRefs = useCallback(
    (node: HTMLDivElement | null) => {
      bunsRef.current = node;
      bunsInViewRef(node);
    },
    [bunsInViewRef]
  );

  const setSaucesRefs = useCallback(
    (node: HTMLDivElement | null) => {
      saucesRef.current = node;
      saucesInViewRef(node);
    },
    [saucesInViewRef]
  );

  const setMainsRefs = useCallback(
    (node: HTMLDivElement | null) => {
      mainsRef.current = node;
      mainsInViewRef(node);
    },
    [mainsInViewRef]
  );

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('buns');
    } else if (saucesInView) {
      setCurrentTab('sauces');
    } else if (mainInView) {
      setCurrentTab('mains');
    }
  }, [bunsInView, saucesInView, mainInView]);

  return (
    <section className={cls.wrapp}>
      <Tabs activeTab={currentTab} bunsRef={bunsRef} saucesRef={saucesRef} mainsRef={mainsRef} />
      <div className={cls.ingredients}>
        <IngredientsSection type='bun' title='Булки' ref={setBunsRefs} />
        <IngredientsSection type='sauce' title='Соусы' ref={setSaucesRefs} />
        <IngredientsSection type='main' title='Начинки' ref={setMainsRefs} />
      </div>
    </section>
  );
};
