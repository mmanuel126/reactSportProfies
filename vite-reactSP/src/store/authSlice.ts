// store/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse } from '../types/account';

type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: Omit<LoginResponse, 'accessToken'> | null;
};

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState: AuthState = {
  isAuthenticated: !!token,
  token,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      const { accessToken, ...userData } = action.payload;
      state.isAuthenticated = true;
      state.token = accessToken;
      state.user = userData;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
