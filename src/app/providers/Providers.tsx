import { store } from '@/shared/models/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};
