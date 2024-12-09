import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import cls from './BurgerIngredients.module.css';
import { Tabs } from './Tabs/Tabs';
import { IngredientsSection } from './IngredientsSection/IngredientsSection';
import { IngredientType } from '@/shared/types/api';
import { IngredientTitles } from '@/shared/types/api';
import { Outlet } from 'react-router-dom';

interface ingredientsSectionType {
  type: IngredientType;
  title: IngredientTitles;
  ref: (node?: Element | null) => void;
}

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<IngredientType>('bun');

  const { ref: bunsRef, inView: bunsInView } = useInView();
  const { ref: saucesRef, inView: saucesInView } = useInView();
  const { ref: mainRef, inView: mainInView } = useInView();

  useEffect(() => {
    if (bunsInView) {
      setCurrentTab('bun');
    } else if (saucesInView) {
      setCurrentTab('sauce');
    } else if (mainInView) {
      setCurrentTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const ingredientsSections: ingredientsSectionType[] = [
    { type: 'bun', title: IngredientTitles.BUN, ref: bunsRef },
    { type: 'sauce', title: IngredientTitles.SAUCE, ref: saucesRef },
    { type: 'main', title: IngredientTitles.MAIN, ref: mainRef },
  ];

  return (
    <>
      <section className={cls.wrapp}>
        <Tabs currentTab={currentTab} />
        <div className={cls.ingredients}>
          {ingredientsSections.map((section) => (
            <IngredientsSection type={section.type} title={section.title} ref={section.ref} key={section.type} />
          ))}
        </div>
      </section>
      <Outlet />
    </>
  );
};
