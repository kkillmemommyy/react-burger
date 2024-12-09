import { ReactNode } from 'react';
import { Paths } from '@/router';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';

interface Props {
  children: ReactNode;
}

export const ProtectedAuthRoute = ({ children }: Props) => {
  const user = useTypedSelector(selectUser);
  const [searchParams] = useSearchParams();

  if (user) {
    const redirectPath = searchParams.get('redirect');
    return <Navigate to={redirectPath || Paths.PROFILE} replace/>
  }

  return children;
};
