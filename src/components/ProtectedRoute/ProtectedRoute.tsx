import { Paths } from '@/router';
import { createSearchParams, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';

export const ProtectedRoute = () => {
  const user = useTypedSelector(selectUser);
  const location = useLocation();

  if (!user) {
    const searchParams = createSearchParams({ redirect: location.pathname });
    return <Navigate to={`${Paths.LOGIN}?${searchParams.toString()}`} replace />;
  }

  return <Outlet />;
};
