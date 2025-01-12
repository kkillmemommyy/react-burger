import { ROUTER_PATHS } from '@/shared/models/routes';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectUser } from '@/shared/models/slices/userSlice/userSelectors';

export const UnProtectedRoute = () => {
  const user = useTypedSelector(selectUser);
  const [searchParams] = useSearchParams();

  if (user) {
    const redirectPath = searchParams.get('redirect');
    return <Navigate to={redirectPath || ROUTER_PATHS.PROFILE} replace />;
  }

  return <Outlet />;
};
