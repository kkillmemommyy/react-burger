import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../types/reduxTypes';

export const useTypedSelector = useSelector.withTypes<AppState>();
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
