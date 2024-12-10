import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessToken, User, userState } from './types';

const initialState: userState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload: { user } }: PayloadAction<{ user: User }>) => {
      state.user = user;
    },
    setAccessToken: (state, { payload: { accessToken } }: PayloadAction<{ accessToken: AccessToken }>) => {
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
