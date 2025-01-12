import { Status } from '@/shared/api/orderFeedApi/types';

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
