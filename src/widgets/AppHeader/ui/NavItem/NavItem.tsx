import clsx from 'clsx';
import { memo, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './NavItem.module.css';

interface Props {
  text: string;
  to: string;
  icon: ReactNode;
}

export const NavItem = memo(({ text, icon, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => clsx(cls.nav_item, { [cls.active]: isActive }, 'mr-2')}
    >
      {icon}
      <span className='text text_type_main-default text_color_inactive ml-2'>{text}</span>
    </NavLink>
  );
});
