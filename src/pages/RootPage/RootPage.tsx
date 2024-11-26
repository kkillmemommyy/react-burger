import { AppHeader } from '@/components/AppHeader/AppHeader';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default RootPage;
