import { ROUTER_PATHS } from '@/shared/models/routes';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/slices/userSlice/userSelectors';

export const UnProtectedRoute = () => {
  const user = useTypedSelector(selectUser);
  const [searchParams] = useSearchParams();

  if (user) {
    const redirectPath = searchParams.get('redirect');
    return <Navigate to={redirectPath || ROUTER_PATHS.PROFILE} replace />;
  }

  return <Outlet />;
};
