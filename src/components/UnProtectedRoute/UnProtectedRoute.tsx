import { Paths } from '@/shared/router';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/slices/userSlice/userSelectors';

export const UnProtectedRoute = () => {
  const user = useTypedSelector(selectUser);
  const [searchParams] = useSearchParams();

  if (user) {
    const redirectPath = searchParams.get('redirect');
    return <Navigate to={redirectPath || Paths.PROFILE} replace />;
  }

  return <Outlet />;
};
