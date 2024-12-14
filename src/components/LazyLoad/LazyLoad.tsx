import { Suspense } from 'react';
import { Loader } from '../Loader/Loader';
import { Outlet } from 'react-router-dom';

export const LazyLoad = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
};
