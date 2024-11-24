import { useState, ChangeEventHandler } from 'react';
import cls from './ResetPasswordPage.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';

interface Form {
  password: string;
  code: string;
}

const ResetPasswordPage = () => {
  const [form, setForm] = useState<Form>({ password: '', code: '' });

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className={cls.main}>
      <form className={cls.container}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <PasswordInput
          placeholder='Введите новый пароль'
          name='password'
          value={form.password}
          onChange={onChangeForm}
        />
        <Input
          name='code'
          value={form.code}
          onChange={onChangeForm}
          type='text'
          placeholder='Введите код из письма'
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Button htmlType='button' type='primary' size='medium'>
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
