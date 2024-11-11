import { store } from './store';
import { useDispatch, useSelector } from 'react-redux';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector = useSelector.withTypes<AppState>();
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
