import './App.css';
import { useGetIngredientsQuery } from '@/services/api/normaApi';
import { AppHeader } from '../AppHeader/AppHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '@/router';

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
      <BrowserRouter>
        <AppHeader />
        <Routes>
          {routes.map((r) => (
            <Route path={r.path} element={r.element} key={r.path} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
};
