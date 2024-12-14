import { ForwardedRef, forwardRef, memo } from 'react';
import cls from './IngredientSection.module.css';
import clsx from 'clsx';
import { IngredientCard } from '../IngredientCard/IngredientCard';
import { useTypedSelector } from '@/services';
import { selectIngredientsByType } from '@/services/selectors/ingredientsApiSelectors'; 
import { IngredientType } from '@/shared/types/api';

interface Props {
  type: IngredientType;
  title: string;
}

const IngredientsSectionComponent = ({ type, title }: Props, ref: ForwardedRef<HTMLElement>) => {
  const ingredients = useTypedSelector(selectIngredientsByType(type));

  return (
    <article className='mb-10' ref={ref} id={type}>
      <h2 className='mb-6 text text_type_main-medium'>{title}</h2>
      <ul className={clsx(cls.category_items, 'pl-4')}>
        {ingredients.map((ing) => (
          <IngredientCard id={ing._id} key={ing._id} />
        ))}
      </ul>
    </article>
  );
};

export const IngredientsSection = memo(forwardRef(IngredientsSectionComponent));
