import { ReactElement, Suspense } from 'react';
import { Loader } from '../Loader/Loader';

interface Props {
  children: ReactElement;
}

export const LazyLoad = ({ children }: Props) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
