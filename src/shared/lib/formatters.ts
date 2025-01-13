import { Status } from '@/shared/api/orderFeed/types';

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
