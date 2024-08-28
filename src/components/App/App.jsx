import { useState, useEffect } from 'react';
import './App.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { MainPage } from '../../pages/MainPage/MainPage';
import { IngredientsContext } from '../../services/AppContext';
import { getResourceUrl } from '../../utils/getResourceUrl';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(getResourceUrl('ingredients'));
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

  if (isLoading) {
    return <div className='prerender loading text text_type_main-large'>LOADING</div>;
  }

  if (hasError) {
    return (
      <div className='prerender text text_type_main-large'>
        Something went wrong while the page was loading. Try refreshing the page or check back later.
      </div>
    );
  }

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={ingredients}>
        <MainPage />
      </IngredientsContext.Provider>
    </>
  );
};
