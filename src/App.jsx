import { useState, useEffect } from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader/AppHeader';
import { MainPage } from './pages/MainPage/MainPage';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Error while loading ingredients');
        }
        const data = await response.json();
        setIngredients(data.data);
        setIsLoading(false);
        setHasError(false);
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };

    getIngredients();
  }, []);

  if (hasError || isLoading) {
    return (<div className='loading text text_type_main-large'>LOADING...</div>)
  }

  return (
    <>
      <AppHeader />
      <MainPage ingredients={ingredients} />
    </>
  );
};
