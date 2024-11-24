import { useState, ChangeEventHandler } from 'react';
import cls from './LoginPage.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';

interface Form {
  password: string;
  email: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<Form>({ password: '', email: '' });

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className={cls.main}>
      <form className={cls.container}>
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput name='email' value={form.email} onChange={onChangeForm} />
        <PasswordInput name='password' value={form.password} onChange={onChangeForm} />
        <Button htmlType='button' type='primary' size='medium'>
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?{' '}
        <Link to={Paths.REGISTRATION} className={cls.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Забыли пароль?{' '}
        <Link to={Paths.FORGOT_PASSWORD} className={cls.link}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
