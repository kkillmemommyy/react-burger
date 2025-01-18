import { useDispatch, useSelector } from 'react-redux';

export const useTypedSelector = useSelector.withTypes<AppState>();
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
