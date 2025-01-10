import { AppHeader } from '@/widgets/AppHeader/AppHeader';
import { useGetUserQuery } from '@/services/api/userApi/userApi';
import { useGetIngredientsQuery } from '@/services/api/ingredientsApi/ingredientsApi';
import { Outlet } from 'react-router-dom';
import { Loader } from '@/components/Loader/Loader';

const RootPage = () => {
  const { error: isIngredientsError, isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const { isLoading: isUserLoading } = useGetUserQuery();

  if (isIngredientsLoading || isUserLoading) {
    return <Loader />;
  }

  if (isIngredientsError) {
    return (
      <div className='prerender text text_type_main-large'>
        При загрузке страницы что-то пошло не так. Попробуйте перезагрузить страницу или вернуться позднее.
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};

export default RootPage;
