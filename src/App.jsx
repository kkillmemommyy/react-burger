import { useState, useEffect } from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader/AppHeader';
import { MainPage } from './pages/MainPage/MainPage';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
  const [ingredients, setIngredients] = useState({ data: [], isLoading: false, hasError: false });

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setIngredients({ ...ingredients, isLoading: true });
        const response = await fetch(API_URL);
        const data = await response.json();
        if (!data.success || !response.ok) {
          throw new Error();
        }
        setIngredients({ ...ingredients, data: data.data, isLoading: false, hasError: false });
      } catch {
        setIngredients({ ...ingredients, isLoading: false, hasError: true });
      }
    };

    getIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      {!ingredients.isLoading && !ingredients.hasError ? 
        (<MainPage ingredients={ingredients.data} />)
        :
        (<div className='loading text text_type_main-large'>LOADING...</div>)
      }
    </>
  );
};
