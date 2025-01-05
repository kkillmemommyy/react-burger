import cls from './ResetPasswordPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@/shared/router';
import { useResetPasswordMutation } from '@/services/api/authApi/authApi';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const schema = z.object({
  token: z.string().min(1, 'Введите код из сообщения').uuid('Код не соответствует ожидаемому формату'),
  password: z.string().min(1, 'Введите новый пароль').min(6, 'Пароль должен содержать не менее 6 символов'),
});

interface Form {
  password: string;
  token: string;
}

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: { password: '', token: '' },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (form: Form) => {
    const response = await resetPassword(form);
    if (response.error && 'status' in response.error) {
      switch (response.error.status) {
        case 404:
          setError('token', { message: 'Неверный код' });
          break;
      }
    } else {
      navigate(Paths.LOGIN, { replace: true });
    }
  };

  if (location.state?.prevPage !== Paths.FORGOT_PASSWORD) {
    return <Navigate to={Paths.FORGOT_PASSWORD} replace />;
  }

  return (
    <main className={cls.main}>
      <form className={cls.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Введите новый пароль'
              icon={showPassword ? 'HideIcon' : 'ShowIcon'}
              type={showPassword ? 'text' : 'password'}
              onIconClick={toggleShowPassword}
              errorText={error?.message}
              error={invalid}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('password');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='token'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Введите код из письма'
              type='text'
              errorText={error?.message}
              error={invalid}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('token');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <Button htmlType='submit' type='primary' size='medium' disabled={isSubmitting}>
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
