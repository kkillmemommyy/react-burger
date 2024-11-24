import { useState, ChangeEventHandler } from 'react';
import cls from './ForgotPasswordPage.module.css';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('');

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className={cls.main}>
      <form className={cls.container}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <EmailInput placeholder='Укажите e-mail' name='email' value={email} onChange={onChangeEmail} />
        <Button htmlType='button' type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вспомнили пароль?{' '}
        <Link to={Paths.LOGIN} className={cls.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ForgotPasswordPage;
