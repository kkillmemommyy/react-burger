import cls from './ProfilePage.module.css';
import clsx from 'clsx';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Paths } from '@/router';
import { NavLink } from 'react-router-dom';
import { useState, ChangeEventHandler, useRef } from 'react';

interface Tab {
  name: string;
  path: Paths;
}

interface Form {
  name: string;
  email: string;
  password: string;
}

interface Editable {
  name: boolean;
  email: boolean;
  password: boolean;
}

const ProfilePage = () => {
  const [form, setForm] = useState<Form>({ name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState<Editable>({ name: false, email: false, password: false });

  const nameImputRef = useRef<HTMLInputElement | null>(null);
  const emailImputRef = useRef<HTMLInputElement | null>(null);
  const passwordImputRef = useRef<HTMLInputElement | null>(null);

  const onIconClick = (name: keyof Form) => {
    switch (name) {
      case 'name':
        setIsEditing({ ...isEditing, name: true });
        setTimeout(() => nameImputRef?.current?.focus(), 0);
        break;
      case 'email':
        setIsEditing({ ...isEditing, email: true });
        setTimeout(() => emailImputRef?.current?.focus(), 0);
        break;
      case 'password':
        setIsEditing({ ...isEditing, password: true });
        setTimeout(() => passwordImputRef?.current?.focus(), 0);
        break;
    }
  };

  const onChangeForm: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const tabs: Tab[] = [
    { name: 'Профиль', path: Paths.PROFILE },
    { name: 'История заказов', path: Paths.PROFILE_ORDERS },
  ];

  return (
    <main className={cls.main}>
      <aside className={clsx('mb-20 mr-15', cls.wrap)}>
        <nav className='mb-15' aria-label='Меню профиля'>
          <ul role='menu'>
            {tabs.map((tab) => (
              <li key={tab.path} role='menuitem'>
                <NavLink
                  to={tab.path}
                  className={({ isActive }) =>
                    clsx('text text_type_main-medium text_color_inactive', cls.link, { [cls.active]: isActive })
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            className={clsx('text text_type_main-medium text_color_inactive', cls.btn)}
            aria-label='Выйти из аккаунта'
          >
            Выход
          </button>
        </nav>

        <p className={clsx(cls.p, 'text text_type_main-default text_color_inactive')}>
          В этом разделе вы можете
          <br />
          изменить свои персональные данные
        </p>
      </aside>

      <div>
        {/* @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required */}
        <Input
          placeholder='Имя'
          name='name'
          value={form.name}
          onChange={onChangeForm}
          type='text'
          icon='EditIcon'
          onIconClick={() => onIconClick('name')}
          onBlur={() => setIsEditing({ ...isEditing, name: false })}
          disabled={!isEditing.name}
          ref={nameImputRef}
          extraClass={clsx('mb-6', cls.input)}
        />
        {/* @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required */}
        <Input
          placeholder='Логин'
          name='email'
          value={form.email}
          onChange={onChangeForm}
          type='email'
          icon='EditIcon'
          onIconClick={() => onIconClick('email')}
          onBlur={() => setIsEditing({ ...isEditing, email: false })}
          disabled={!isEditing.email}
          ref={emailImputRef}
          extraClass={clsx('mb-6', cls.input)}
        />
        {/* @ts-expect-error onPointerEnterCapture, onPointerLeaveCapture is required */}
        <Input
          placeholder='Пароль'
          name='password'
          value={form.password}
          onChange={onChangeForm}
          type='password'
          icon='EditIcon'
          onIconClick={() => onIconClick('password')}
          onBlur={() => setIsEditing({ ...isEditing, password: false })}
          disabled={!isEditing.password}
          ref={passwordImputRef}
          extraClass={cls.input}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
