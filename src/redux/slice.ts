import { User } from './types/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { LoginResponse } from './types/auth';
import { authApi } from './api/authAPi';

interface UserSliceState {
  token: string | null;
  user: User | null;
}

const initialState: UserSliceState = {
  token: null,
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      storage.removeItem('persist:root');
      window.localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      window.location.pathname = '/login';
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        const token = payload.token;
        state.token = token;
      }
    ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.token = payload.token;
        }
      );
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
