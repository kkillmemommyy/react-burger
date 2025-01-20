import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { userState } from './types';
import { authApi } from '@/shared/api/auth/authApi';
import { localStorageRemoveItem, localStorageSetItem } from '@/shared/lib/localStorage';
import { refreshTokenApi } from '@/shared/api/refreshToken/refreshTokenApi';
import { userApi } from '@/shared/api/user/userApi';

const initialState: userState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(refreshTokenApi.endpoints.refreshToken.matchRejected, authApi.endpoints.logout.matchPending),
        (state) => {
          state.user = null;
          state.accessToken = null;
          localStorageRemoveItem('refreshToken');
        }
      )
      .addMatcher(
        refreshTokenApi.endpoints.refreshToken.matchFulfilled,
        (state, { payload: { accessToken, refreshToken } }) => {
          localStorageSetItem('refreshToken', refreshToken);
          state.accessToken = accessToken;
        }
      )
      .addMatcher(
        isAnyOf(userApi.endpoints.getUser.matchFulfilled, userApi.endpoints.patchUser.matchFulfilled),
        (state, { payload: { user } }) => {
          state.user = user;
        }
      )
      .addMatcher(
        isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.registration.matchFulfilled),
        (state, { payload: { accessToken, refreshToken, user } }) => {
          localStorageSetItem('refreshToken', refreshToken);
          state.user = user;
          state.accessToken = accessToken;
        }
      );
  },
});

export const userReducer = userSlice.reducer;
