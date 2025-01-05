import cls from './ForgotPasswordPage.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { Paths } from '@/shared/router';
import { useForgotPasswordMutation } from '@/services/api/authApi/authApi';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const schema = z.object({
  email: z.string().min(1, 'Укажите email').email('Некорректный email'),
});

const ForgotPasswordPage = () => {
  const [forgotPasswordReauest] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = (form: { email: string }) => {
    forgotPasswordReauest(form);
    navigate(Paths.RESET_PASSWORD, { state: { prevPage: Paths.FORGOT_PASSWORD }, replace: true });
  };

  const { control, handleSubmit, clearErrors } = useForm({
    defaultValues: { email: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  return (
    <main className={cls.main}>
      <form className={cls.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            //@ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='E-mail'
              type='text'
              error={invalid}
              errorText={error?.message}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('email');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <Button htmlType='submit' type='primary' size='medium'>
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
