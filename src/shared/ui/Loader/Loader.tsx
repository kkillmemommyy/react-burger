import { LogoSmall } from '@/shared/ui/LogoSmall';
import cls from './Loader.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  type?: 'text' | 'icon';
  className?: string;
  delay?: boolean;
  text?: string;
  center?: boolean;
}

export const Loader = ({ type = 'icon', className, delay = false, text = 'LOADING', center = true }: Props) => {
  const [isLoaderShow, setIsLoaderShow] = useState(!delay);

  useEffect(() => {
    if (!delay) return;

    const timerId = setTimeout(() => setIsLoaderShow(true), 1500);
    return () => clearTimeout(timerId);
  }, [delay]);

  if (!isLoaderShow) {
    return null;
  }

  return type === 'icon' ? (
    <LogoSmall className={clsx(cls.icon, { [cls.center]: center }, className)} />
  ) : (
    <div className={clsx(cls.text, 'text text_type_main-medium', { [cls.center]: center }, className)}>{text}</div>
  );
};
