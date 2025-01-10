import { AppRouter } from './router/AppRouter';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};
