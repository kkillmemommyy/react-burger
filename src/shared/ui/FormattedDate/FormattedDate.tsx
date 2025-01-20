import { getFormattedDate } from '@/shared/lib/formatters';
import clsx from 'clsx';

interface Props {
  date: Date;
  className?: string;
}

const FormattedDate = ({ date, className }: Props) => {
  const content = getFormattedDate(date);

  return <span className={clsx('text text_type_main-default text_color_inactive', className)}>{content}</span>;
};

export default FormattedDate;
