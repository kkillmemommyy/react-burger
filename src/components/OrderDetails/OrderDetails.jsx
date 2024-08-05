import doneImg from '../../images/done.png'
import cls from './OrderDetails.module.css'
import clsx from 'clsx'

export const OrderDetails = () => {
  return (
    <>
      <p className='text text_type_digits-large mt-4 mb-8'>034536</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={doneImg} alt='done' className={clsx(cls.img, 'mb-15')}/>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};
