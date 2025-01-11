import cls from './NotFound404Page.module.css';
import { Link } from 'react-router-dom';
import notFoundImg from '../assets/not-found.png';
import { ROUTER_PATHS } from '@/shared/constants/routes';

const NotFound404Page = () => {
  return (
    <main className={cls.main}>
      <img className={cls.img} src={notFoundImg} alt='not found' />
      <p className='text text_type_main-medium text_color_inactive'>
        Страница, которую вы запросили, пока не существует {':_('}
      </p>
      <p className='text text_type_main-medium text_color_inactive'>
        Проверьте введённый адрес или вернитесь на{' '}
        <Link to={ROUTER_PATHS.HOME_PAGE} className={cls.link} replace>
          главную
        </Link>
      </p>
    </main>
  );
};

export default NotFound404Page;
