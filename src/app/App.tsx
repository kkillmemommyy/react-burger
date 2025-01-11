import { AppRouter } from './router';
import { Providers } from './providers';
import './styles/index.css';

export const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};
