import cls from './LoginPage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/constants/routes';
import { useLoginMutation } from '@/services/api/authApi/authApi';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import clsx from 'clsx';

const schema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

interface Form {
  password: string;
  email: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginRequest] = useLoginMutation();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    delayError: 600,
  });

  const onSubmit = async (data: Form) => {
    const response = await loginRequest(data);
    if (response.error && 'status' in response.error) {
      switch (response.error.status) {
        case 401:
          setError('root.serverError', { message: 'Неверный логин или пароль' });
          break;
      }
    }
  };

  const clearErrorsField = (field: keyof Form, invalid: boolean) => {
    if (isSubmitted) {
      if (errors.root?.serverError) {
        clearErrors('root');
      }
      if (invalid) {
        clearErrors(field);
      }
    }
  };

  return (
    <main className={cls.main}>
      <form className={cls.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text text_type_main-medium'>Вход</h1>
        {errors.root?.serverError && (
          <p className={clsx(cls.authError, 'text text_type_main-default')}>{errors.root.serverError.message}</p>
        )}

        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              type='text'
              placeholder='E-mail'
              errorText={error?.message}
              error={invalid}
              onChange={(e) => {
                clearErrorsField('email', invalid);
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Пароль'
              icon={showPassword ? 'HideIcon' : 'ShowIcon'}
              type={showPassword ? 'text' : 'password'}
              onIconClick={toggleShowPassword}
              errorText={error?.message}
              error={invalid}
              onChange={(e) => {
                clearErrorsField('email', invalid);
                field.onChange(e);
              }}
            />
          )}
        />

        <Button htmlType='submit' type='primary' size='medium' disabled={isSubmitting}>
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?{' '}
        <Link to={ROUTER_PATHS.REGISTRATION} className={cls.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Забыли пароль?{' '}
        <Link to={ROUTER_PATHS.FORGOT_PASSWORD} className={cls.link}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
