import { store } from '../store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.MODE !== 'production' ? undefined : import.meta.env.BASE_URL}>
        {children}
      </BrowserRouter>
    </Provider>
  );
};
