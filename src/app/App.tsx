import { AppRouter } from './router';
import { Providers } from './providers';
import './styles/index.css';
import { Preloader } from './Preloader';
import { AppHeader } from '@/widgets/AppHeader';

export const App = () => {
  return (
    <Providers>
      <Preloader>
        <AppHeader />
        <AppRouter />
      </Preloader>
    </Providers>
  );
};
