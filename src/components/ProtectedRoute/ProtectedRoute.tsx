import { ReactNode } from 'react';
import { Paths } from '@/router';
import { createSearchParams, Navigate, useLocation } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const user = useTypedSelector(selectUser);
  const location = useLocation()

  if (!user) {
    const searchParams = createSearchParams({redirect: location.pathname})
    return <Navigate to={`${Paths.LOGIN}?${searchParams.toString()}`} replace/>;
  }

  return children;
};
