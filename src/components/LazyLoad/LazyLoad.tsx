import { ReactElement, Suspense } from 'react';

interface Props {
  children: ReactElement;
}

export const LazyLoad = ({ children }: Props) => {
  const Loader = <div className='prerender loading text text_type_main-large'>LOADING</div>;

  return <Suspense fallback={Loader}>{children}</Suspense>;
};
