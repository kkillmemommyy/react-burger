import { AppHeader } from './components/AppHeader/AppHeader.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <main className='pt-10'>
        <MainPage />
      </main>
    </>
  );
}

export { App };
