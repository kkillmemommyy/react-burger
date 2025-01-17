import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from './EditProfile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useTypedSelector } from '@/shared/lib/typedReduxHooks';
import { selectUser } from '@/shared/models/slices/user/userSelectors';
import { usePatchUserMutation } from '@/shared/api/user/userApi';

interface Editable {
  name: boolean;
  email: boolean;
  password: boolean;
}

const schema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().min(1, 'Email обязателен').email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать не менее 6 символов').or(z.literal('')),
});

const EditProfile = () => {
  const user = useTypedSelector(selectUser);
  const [patchUserRequest] = usePatchUserMutation();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
    reset,
    clearErrors,
  } = useForm<{ name: string; email: string; password: string }>({
    defaultValues: { name: '', email: '', password: '' },
    values: user ? { ...user, password: '' } : undefined,
    resolver: zodResolver(schema),
    mode: 'onChange',
    delayError: 400,
  });

  const isResetBtnDisabled = !isDirty || isSubmitting;
  const isSubmitBtnDisabled = !isDirty || isSubmitting || !isValid;

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState<Editable>({
    name: false,
    email: false,
    password: false,
  });

  const onClickReset = () => {
    setIsEditing({
      email: false,
      name: false,
      password: false,
    });
    reset();
  };

  const onIconClick = (field: keyof Editable) => {
    setIsEditing({
      email: false,
      name: false,
      password: false,
      [field]: !isEditing[field],
    });
    setTimeout(() => {
      const inputRef = {
        name: nameInputRef,
        email: emailInputRef,
        password: passwordInputRef,
      }[field];
      inputRef?.current?.focus();
    }, 0);
  };

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    const { password, ...rest } = data;
    const formToSubmit = password ? data : rest;
    setIsEditing({
      email: false,
      name: false,
      password: false,
    });
    const response = await patchUserRequest(formToSubmit);

    if (response.data) {
      const { name, email } = response.data.user;
      reset({
        name,
        email,
        password: '',
      });
    }
  };

  return (
    <main className={cls.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Имя'
              type='text'
              icon='EditIcon'
              ref={nameInputRef}
              disabled={!isEditing.name}
              onIconClick={() => onIconClick('name')}
              error={invalid}
              errorText={error?.message}
              extraClass={clsx('mb-6', cls.input)}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('name');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Логин'
              type='text'
              icon='EditIcon'
              ref={emailInputRef}
              disabled={!isEditing.email}
              onIconClick={() => onIconClick('email')}
              error={invalid}
              errorText={error?.message}
              extraClass={clsx('mb-6', cls.input)}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('email');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
            <Input
              {...field}
              placeholder='Пароль'
              type='password'
              icon='EditIcon'
              ref={passwordInputRef}
              disabled={!isEditing.password}
              onIconClick={() => onIconClick('password')}
              error={invalid}
              errorText={error?.message}
              extraClass={clsx('mb-6', cls.input)}
              onChange={(e) => {
                if (invalid) {
                  clearErrors('password');
                }
                field.onChange(e);
              }}
            />
          )}
        />
        <div className={cls.container}>
          <div className={clsx('mr-5', cls.btnWrap)}>
            <Button htmlType='reset' onClick={onClickReset} disabled={isResetBtnDisabled}>
              Отменить
            </Button>
          </div>
          <Button htmlType='submit' disabled={isSubmitBtnDisabled}>
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
