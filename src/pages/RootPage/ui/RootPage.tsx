import { AppHeader } from '@/widgets/AppHeader/ui/AppHeader';
import { useGetUserQuery } from '@/services/api/userApi/userApi';
import { useGetIngredientsQuery } from '@/services/api/ingredientsApi/ingredientsApi';
import { Outlet } from 'react-router-dom';
import { Loader } from '@/shared/ui/Loader';
import { PageErrorMessage } from '@/shared/ui/PageErrorMessage';

const RootPage = () => {
  const { isError, isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const { isLoading: isUserLoading } = useGetUserQuery();

  if (isIngredientsLoading || isUserLoading) {
    return <Loader type='icon' />;
  }

  if (isError) {
    return <PageErrorMessage hasLogo />;
  }

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default RootPage;
