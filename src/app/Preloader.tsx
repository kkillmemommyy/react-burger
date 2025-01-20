import { useGetUserQuery } from '@/shared/api/user/userApi';
import { useGetIngredientsQuery } from '@/shared/api/ingredients/ingredientsApi';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Preloader = ({ children }: Props) => {
  const { isError, isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const { isLoading: isUserLoading } = useGetUserQuery();

  if (isIngredientsLoading || isUserLoading) {
    return <Loader/>;
  }

  if (isError) {
    return <PageErrorMessage hasLogo />;
  }

  return <>{children}</>;
};
