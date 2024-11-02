import { forwardRef, memo } from 'react';
import cls from './IngredientSection.module.css';
import clsx from 'clsx';
import { IngredientCard } from '../IngredientCard';
import { useSelector } from 'react-redux';
import { selectIngredientsByType } from '../../../services/selectors/normaApiSelectors';

const IngredientsSectionComponent = ({ type, title, activateModal }, ref) => {
  const ingredients = useSelector(selectIngredientsByType(type));

  return (
    <article className='mb-10' ref={ref} id={type}>
      <h2 className='mb-6 text text_type_main-medium'>{title}</h2>
      <ul className={clsx(cls.category_items, 'pl-4')}>
        {ingredients.map((ing) => (
          <IngredientCard id={ing._id} activateModal={activateModal} key={ing._id} />
        ))}
      </ul>
    </article>
  );
};

export const IngredientsSection = memo(forwardRef(IngredientsSectionComponent));
