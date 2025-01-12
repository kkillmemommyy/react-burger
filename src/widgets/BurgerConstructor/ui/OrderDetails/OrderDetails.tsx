import doneImg from '../../assets/done.png';
import cls from './OrderDetails.module.css';
import clsx from 'clsx';
import { Loader } from '@/shared/ui/Loader';
import { LogoSmall } from '@/shared/ui/LogoSmall';

interface Props {
  orderId: number | null;
  isError: boolean;
  isLoading: boolean;
}

export const OrderDetails = ({ orderId, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className={cls.wrap}>
        <Loader className={cls.logo_loader} />
        <p className='text text_type_main-medium mt-10'>Подождите, пока оформляется заказ</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cls.wrap}>
        <LogoSmall className={clsx(cls.logo, cls.logo_static)} />
        <p className={clsx(cls.error_text, 'text text_type_main-medium mt-4 mb-4')}>
          Во время оформления заказа что-то пошло не так, попробуйте позднее
        </p>
        <p className='text text_type_main-medium'>{':_('}</p>
      </div>
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
