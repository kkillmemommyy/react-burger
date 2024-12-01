import { useState, ChangeEventHandler, FormEventHandler } from 'react';
import cls from './ResetPasswordPage.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';
import { useResetPasswordMutation } from '@/services/api/authApi/authApi';

interface Form {
  password: string;
  token: string;
}

const ResetPasswordPage = () => {
  const [form, setForm] = useState<Form>({ password: '', token: '' });
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (form.password.length >= 6) {
      resetPassword(form);
    }
  };

  return (
    <main className={cls.main}>
      <form className={cls.container} onSubmit={onSubmit}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <PasswordInput
          placeholder='Введите новый пароль'
          name='password'
          value={form.password}
          onChange={onChangeForm}
          required
          errorText='Пароль должен содержать не менее 6 символов'
        />
        {/* @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required */}
        <Input
          name='token'
          value={form.token}
          onChange={onChangeForm}
          type='text'
          placeholder='Введите код из письма'
          required
          autoFocus
          error={isError}
          errorText='Неверный код'
        />
        <Button htmlType='submit' type='primary' size='medium' disabled={isLoading}>
          Сохранить
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

export default ResetPasswordPage;
