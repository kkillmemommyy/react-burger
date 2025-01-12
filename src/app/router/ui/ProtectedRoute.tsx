import { ROUTER_PATHS } from '@/shared/models/routes';
import { createSearchParams, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/slices/userSlice/userSelectors';

export const ProtectedRoute = () => {
  const user = useTypedSelector(selectUser);
  const location = useLocation();

  if (!user) {
    const searchParams = createSearchParams({ redirect: location.pathname });
    return <Navigate to={`${ROUTER_PATHS.LOGIN}?${searchParams.toString()}`} replace />;
  }

  return <Outlet />;
};
