import { AppState } from "@/shared/types/reduxTypes";

export const selectUser = (state: AppState) => state.user.user;
export const selectAccessToken = (state: AppState) => state.user.accessToken;
