import { AppHeader } from '@/components/AppHeader/AppHeader';
import { useGetUserQuery } from '@/services/api/authApi/accessAuthApi';
import { useGetIngredientsQuery } from '@/services/api/ingredientsApi/ingredientsApi';
import { Outlet } from 'react-router-dom';

const RootPage = () => {
  const { error: isIngredientsError, isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const { isLoading: isUserLoading } = useGetUserQuery();

  if (isIngredientsLoading || isUserLoading) {
    return <div className='prerender loading text text_type_main-large'>LOADING</div>;
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
