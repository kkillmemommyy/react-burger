import './App.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainPage } from '../../pages/MainPage/MainPage';
import { useGetIngredientsQuery } from '../../services/api/normaApi';

export const App = () => {
  const { error, isLoading } = useGetIngredientsQuery();

  if (isLoading) {
    return <div className='prerender loading text text_type_main-large'>LOADING</div>;
  }

  if (error) {
    return (
      <div className='prerender text text_type_main-large'>
        При загрузке страницы что-то пошло не так. Попробуйте перезагрузить страницу или вернуться позднее.
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <MainPage />
    </>
  );
};
