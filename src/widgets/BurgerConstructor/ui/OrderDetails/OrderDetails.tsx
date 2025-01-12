import doneImg from '../../assets/done.png';
import cls from './OrderDetails.module.css';
import clsx from 'clsx';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
  orderId: number | null;
  isLoading: boolean;
}

export const OrderDetails = ({ orderId, isLoading, error }: Props) => {
  if (isLoading) {
    return <div className={cls.loader}></div>;
  }

  if (error) {
    return (
      <>
        <p className={clsx(cls.error, 'text text_type_main-medium mb-8')}>
          Во время оформления заказа что-то пошло не так, попробуйте позднее
        </p>
        <p className='text text_type_main-medium'>{':_('}</p>
      </>
    );
  }

  return (
    <>
      <p className='text text_type_digits-large mt-4 mb-8'>{orderId}</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={doneImg} alt='done' className={clsx(cls.img, 'mb-15')} />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
