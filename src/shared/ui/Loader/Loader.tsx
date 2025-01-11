import { LogoSmall } from '@/shared/ui/LogoSmall';
import cls from './Loader.module.css';
import clsx from 'clsx';

interface Props {
  type?: 'text' | 'icon';
  className?: string;
}

export const Loader = ({ type = 'icon', className }: Props) => {
  return type === 'icon' ? (
    <LogoSmall className={clsx(cls.icon, cls.center, className)} />
  ) : (
    <div className={clsx(cls.text, cls.center, 'text text_type_main-large', className)}>LOADING</div>
  );
};
