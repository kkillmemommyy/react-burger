import { forwardRef } from 'react';
import cls from './IngredientSection.module.css';
import clsx from 'clsx';
import { IngredientCard } from '../../IngredientCard/IngredientCard';

export const IngredientsSection = forwardRef(
  ({ categoryId, title, ingredients, activateModal, countedIngredients }, ref) => {
    return (
      <article className='mb-10' ref={ref} id={categoryId}>
        <h2 className='mb-6 text text_type_main-medium'>{title}</h2>
        <ul className={clsx(cls.category_items, 'pl-4')}>
          {ingredients.map((ing) => (
            <IngredientCard
              activateModal={activateModal}
              proteins={ing.proteins}
              fat={ing.fat}
              carbohydrates={ing.carbohydrates}
              calories={ing.calories}
              image_large={ing.image_large}
              image={ing.image}
              name={ing.name}
              price={ing.price}
              count={countedIngredients[ing._id]}
              key={ing._id}
            />
          ))}
        </ul>
      </article>
    );
  }
);
