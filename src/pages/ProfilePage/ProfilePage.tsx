import cls from './ProfilePage.module.css';
import clsx from 'clsx';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const ProfilePage = () => {
  const tabs: string[] = ['Профиль', 'История заказов', 'Выход'];

  return (
    <main className={cls.main}>
      <div className={clsx('mb-20 mr-15', cls.wrap)}>
        <nav className='mb-15'>
          <ul>
            {tabs.map((tab) => (
              <li className={clsx('text text_type_main-medium text_color_inactive', cls.li)}>{tab}</li>
            ))}
          </ul>
        </nav>
        <p className='text text_type_main-default text_color_inactive' style={{ opacity: '70%' }}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </div>
      <div>
        <Input
          name='name'
          value='Марк'
          type='text'
          placeholder='Имя'
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
