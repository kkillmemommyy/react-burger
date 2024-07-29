import { AppHeader } from './components/AppHeader/AppHeader';
import { MainPage } from './pages/MainPage/MainPage';
import './App.css';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className='pt-10'>
        <MainPage />
      </main>
    </>
  );
};
