import clsx from 'clsx';
import cls from './DragbleElement.module.css';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { selectedIngredientsActions } from '../../../services/slices/selectedIngredientsSlice';
import { useDispatch } from 'react-redux';

export const DragbleElement = memo(({ index, children }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'selectedIng',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: { index },
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: 'selectedIng',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: ({ index: dragIndex }) => dispatch(selectedIngredientsActions.moveCard({ dragIndex, dropIndex: index })),
  });

  return (
    <div className={clsx(cls.constructorElement, { [cls.drag]: isDragging, [cls.over]: isOver })} ref={(node) => dragRef(dropRef(node))}>
      <div className={clsx(cls.dragIcon, 'mr-2')}>
        <DragIcon type='primary' />
      </div>
      {children}
    </div>
  );
});
