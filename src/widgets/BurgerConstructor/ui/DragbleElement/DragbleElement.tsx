import clsx from 'clsx';
import cls from './DragbleElement.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '@/shared/models/slices/selectedIngredients/selectedIngredientsSlice';
import { useTypedDispatch } from '@/shared/lib/typedReduxHooks';
import { useRef, useEffect, ReactNode } from 'react';

interface Props {
  index: number;
  children: ReactNode;
}

export const DragbleElement = ({ index, children }: Props) => {
  const dispatch = useTypedDispatch();
  const ref = useRef(null);

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: 'selectedIng',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => {
      return { index };
    },
  });

  const [, dropRef] = useDrop({
    accept: 'selectedIng',
    hover: (item: { index: number }) => {
      const { index: dragIndex } = item;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }

      dispatch(selectedIngredientsActions.moveCard({ dragIndex, dropIndex }));
      item.index = dropIndex;
    },
  });

  //bug in react-dnd lib
  //https://github.com/react-dnd/react-dnd/issues/3452
  useEffect(() => {
    previewRef(dropRef(ref));
  }, [dragRef, dropRef, previewRef, ref]);

  return (
    <div className={clsx(cls.constructor_element, { [cls.drag]: isDragging })} ref={ref}>
      <div className={clsx(cls.drag_icon, 'mr-2')} ref={dragRef}>
        <DragIcon type='primary' />
      </div>
      {children}
    </div>
  );
};
