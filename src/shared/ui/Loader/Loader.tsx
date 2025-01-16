import { LogoSmall } from '@/shared/ui/LogoSmall';
import cls from './Loader.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Props {
  type?: 'text' | 'icon';
  className?: string;
  delay?: boolean;
}

export const Loader = ({ type = 'icon', className, delay = false }: Props) => {
  const [isLoaderShow, setIsLoaderShow] = useState(!delay);

  useEffect(() => {
    if (!delay) return;

    const timerId = setTimeout(() => setIsLoaderShow(true), 1000);
    return () => clearTimeout(timerId);
  }, [delay]);

  if (!isLoaderShow) {
    return null;
  }

  return type === 'icon' ? (
    <LogoSmall className={clsx(cls.icon, cls.center, className)} />
  ) : (
    <div className={clsx(cls.text, cls.center, 'text text_type_main-large', className)}>LOADING</div>
  );
};
