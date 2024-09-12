import './App.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainPage } from '../../pages/MainPage/MainPage';
import { useGetIngredientsQuery as getIngredients } from '../../services/api/burgersApi';

export const App = () => {
  const { error, isLoading } = getIngredients();

  if (isLoading) {
    return <div className='prerender loading text text_type_main-large'>LOADING</div>;
  }

  if (error) {
    return (
      <div className='prerender text text_type_main-large'>
        Something went wrong while the page was loading. Try refreshing the page or check back later.
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
