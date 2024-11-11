import { ReactNode } from 'react';
import { AppHeader } from '../AppHeader/AppHeader';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};
