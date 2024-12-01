import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import cls from './LoginPage.module.css';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';
import { useLoginMutation } from '@/services/api/authApi/authApi';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';
import { Navigate } from 'react-router-dom';

interface Form {
  password: string;
  email: string;
}

const LoginPage = () => {
  const [form, setForm] = useState<Form>({ password: '', email: '' });
  const [loginRequest, { isError, isLoading }] = useLoginMutation();
  const user = useTypedSelector(selectUser);

  if (user) {
    return <Navigate to={Paths.HOME_PAGE} replace />;
  }

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await loginRequest(form);
  };

  return (
    <main className={cls.main}>
      <form className={cls.container} onSubmit={onSubmit}>
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput name='email' value={form.email} onChange={onChangeForm} required />
        <PasswordInput name='password' value={form.password} onChange={onChangeForm} required />
        <Button htmlType='submit' type='primary' size='medium' disabled={isLoading}>
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
