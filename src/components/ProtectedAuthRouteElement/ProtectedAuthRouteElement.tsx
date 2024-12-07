import { ReactNode } from 'react';
import { Paths } from '@/router';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';

interface Props {
  children: ReactNode;
}

export const ProtectedAuthRouteElement = ({ children }: Props) => {
  const user = useTypedSelector(selectUser);

  if (user) {
    return <Navigate to={Paths.HOME_PAGE} />;
  }

  return children;
};
