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

export const getFormattedDate = (date: Date) => {
  const msInDay = 86400000;

  const time = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  const today = new Date();
  let dayAgo = Math.floor((today.getTime() - date.getTime()) / msInDay);
  const msRemains = today.getTime() - (date.getTime() + dayAgo * msInDay);
  const dateAgoMsRemains = new Date(today.getTime() - msRemains).getDate();

  dayAgo += today.getDate() !== dateAgoMsRemains ? 1 : 0;

  if (dayAgo === 0) {
    return `Сегодня, ${time}`;
  } else if (dayAgo === 1) {
    return `Вчера, ${time}`;
  } else if (dayAgo > 1 && dayAgo <= 4) {
    return `${dayAgo} дня назад, ${time}`;
  } else {
    return `${dayAgo} дней назад, ${time}`;
  }
};
