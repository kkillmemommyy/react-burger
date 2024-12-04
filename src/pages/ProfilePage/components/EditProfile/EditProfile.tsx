import { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cls from './EditProfile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useTypedSelector } from '@/services';
import { selectUser } from '@/services/selectors/userSelectors';
import { User } from '@/services/slices/userSlice/types';
import { usePatchUserMutation } from '@/services/api/authApi/accessAuthApi';

interface Editable {
  name: boolean;
  email: boolean;
  password: boolean;
}

const schema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((val) => val === '' || (val && val.length >= 6), {
      message: 'Пароль должен содержать не менее 6 символов',
    }),
});

export const EditProfile = () => {
  const user = useTypedSelector(selectUser) as User;
  const [patchUserRequest] = usePatchUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    trigger,
    clearErrors,
  } = useForm({
    defaultValues: { name: user.name, email: user.email, password: '' },
    resolver: zodResolver(schema),
  });

  const isDisabledResetBtn = !isDirty || isSubmitting;
  const isDisabledSubmitBtn = !isDirty || isSubmitting || !isValid;

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const timers = useRef<Record<keyof Editable, number | null>>({ name: null, password: null, email: null });

  const errorsTimeout = (field: keyof Editable) => {
    if (timers.current[field]) {
      clearTimeout(timers.current[field]);
    }

    clearErrors(field);

    timers.current[field] = setTimeout(() => {
      trigger(field);
    }, 1000);
  };

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

  const onSubmit = async (data: { name: string; email: string; password?: string }) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
          <Input
            {...field}
            placeholder='Имя'
            type='text'
            icon='EditIcon'
            ref={nameInputRef}
            disabled={!isEditing.name}
            onIconClick={() => onIconClick('name')}
            onChange={(e) => {
              field.onChange(e);
              errorsTimeout(field.name);
            }}
            error={!!errors.name}
            errorText={errors.name?.message}
            extraClass={clsx('mb-6', cls.input)}
          />
        )}
      />
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
          <Input
            {...field}
            placeholder='Логин'
            type='email'
            icon='EditIcon'
            ref={emailInputRef}
            disabled={!isEditing.email}
            onIconClick={() => onIconClick('email')}
            onChange={(e) => {
              field.onChange(e);
              errorsTimeout(field.name);
            }}
            error={!!errors.email}
            errorText={errors.email?.message}
            extraClass={clsx('mb-6', cls.input)}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          // @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required
          <Input
            {...field}
            placeholder='Пароль'
            type='password'
            icon='EditIcon'
            ref={passwordInputRef}
            disabled={!isEditing.password}
            onIconClick={() => onIconClick('password')}
            onChange={(e) => {
              field.onChange(e);
              errorsTimeout(field.name);
            }}
            error={!!errors.password}
            errorText={errors.password?.message}
            extraClass={clsx('mb-6', cls.input)}
          />
        )}
      />
      <div className={cls.container}>
        <div className={clsx('mr-5', cls.btnWrap)}>
          <Button htmlType='reset' onClick={onClickReset} disabled={isDisabledResetBtn}>
            Отменить
          </Button>
        </div>
        <Button htmlType='submit' disabled={isDisabledSubmitBtn}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
