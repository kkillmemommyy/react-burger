import clsx from 'clsx';
import cls from './DragbleElement.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '../../../services/slices/selectedIngredientsSlice';
import { useDispatch } from 'react-redux';
import { useRef, useEffect } from 'react';

export const DragbleElement = ({ index, children }) => {
  const dispatch = useDispatch();
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
    hover: (item) => {
      const { index: dragIndex } = item;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }

      dispatch(selectedIngredientsActions.moveCard({ dragIndex, dropIndex }));
      item.index = dropIndex;
    },
  });

  useEffect(() => {
    previewRef(dropRef(ref));
  }, [dragRef, dropRef, previewRef, ref]);

  return (
    <div className={clsx(cls.constructorElement, { [cls.drag]: isDragging })} ref={ref}>
      <div className={clsx(cls.dragIcon, 'mr-2')} ref={dragRef}>
        <DragIcon type='primary' />
      </div>
      {children}
    </div>
  );
};
