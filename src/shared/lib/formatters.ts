import { Status } from '@/shared/api/orders/types';
import { Order } from '@/shared/api/orders/types';
import { Ingredient } from '@/shared/types/api';

export const getStatusLable = (status: Status) => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
  }
};

export const getFormattedOrder = (order: Order, ingredients: Record<string, Ingredient>) => {
  const { ingredients: ingredientIds, ...other } = order;

  const mappedIngredients = ingredientIds.map((id) => ingredients[id]).filter(Boolean);
  const bun = mappedIngredients.find((ing) => ing.type === 'bun');
  const otherIngredients = mappedIngredients.filter((ing) => ing.type !== 'bun');

  const transformedIngredients = bun ? [bun, ...otherIngredients] : otherIngredients;

  const totalPrice = (bun?.price ?? 0) + otherIngredients.reduce((acc, ing) => acc + ing.price, 0);

  return { totalPrice, ingredients: transformedIngredients, ...other };
};
