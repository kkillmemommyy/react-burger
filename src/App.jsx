import { AppHeader } from './components/AppHeader/AppHeader.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
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
