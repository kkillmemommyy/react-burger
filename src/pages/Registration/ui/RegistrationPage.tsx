import cls from './RegistrationPage.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from '@/shared/models/routes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useRegistrationMutation } from '@/shared/api/auth/authApi';
import clsx from 'clsx';

const schema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

interface Form {
  name: string;
  password: string;
  email: string;
}

const RegistrationPage = () => {
  const [registrationRequest] = useRegistrationMutation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, isValid, errors },
    clearErrors,
    setError,
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    delayError: 400,
  });

  const isSubmitBtnDisabled = isSubmitting || (isSubmitted && !isValid);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: Form) => {
    const response = await registrationRequest(data);
    if (response.error && 'status' in response.error) {
      switch (response.error.status) {
        case 403:
          setError('email', { message: 'Email занят' });
          setError('root.serverError', { message: 'Пользователь уже существует' });
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
        <h1 className='text text_type_main-medium'>Регистрация</h1>
        {errors.root?.serverError && (
          <p className={clsx(cls.authError, 'text text_type_main-default')}>{errors.root.serverError.message}</p>
        )}
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            //@ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Имя'
              type='text'
              error={invalid}
              errorText={error?.message}
              onChange={(e) => {
                clearErrorsField('name', invalid);
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='E-mail'
              type='text'
              error={invalid}
              errorText={error?.message}
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
                clearErrorsField('password', invalid);
                field.onChange(e);
              }}
            />
          )}
        />
        <Button htmlType='submit' type='primary' size='medium' disabled={isSubmitBtnDisabled}>
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Уже зарегистрированы?{' '}
        <Link to={ROUTER_PATHS.LOGIN} className={cls.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegistrationPage;
