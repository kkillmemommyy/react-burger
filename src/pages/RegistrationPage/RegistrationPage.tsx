import { useState, ChangeEventHandler } from 'react';
import cls from './RegistrationPage.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/router';

interface Form {
  password: string;
  email: string;
  name: string;
}

const RegistrationPage = () => {
  const [form, setForm] = useState<Form>({ password: '', email: '', name: '' });

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className={cls.main}>
      <form className={cls.container}>
        <h1 className='text text_type_main-medium'>Регистрация</h1>
        {/* @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required */}
        <Input
          name='name'
          value={form.name}
          onChange={onChangeForm}
          type='text'
          placeholder='Имя'
        />
        <EmailInput name='email' value={form.email} onChange={onChangeForm} />
        <PasswordInput name='password' value={form.password} onChange={onChangeForm} />
        <Button htmlType='button' type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Уже зарегистрированы?{' '}
        <Link to={Paths.LOGIN} className={cls.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegistrationPage;
