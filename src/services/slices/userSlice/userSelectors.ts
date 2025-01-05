import { AppState } from '../..';

export const selectUser = (state: AppState) => state.user.user;
export const selectAccessToken = (state: AppState) => state.user.accessToken;
