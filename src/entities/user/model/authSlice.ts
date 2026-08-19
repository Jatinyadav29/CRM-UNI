import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IAuthState, IUser } from './types';
import {
  hydrateUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from './authThunks';

const initialState: IAuthState = {
  user: null,
  sessionToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.sessionToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.sessionToken = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });

    // Register
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.sessionToken = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
      });

    // Hydrate
    builder
      .addCase(hydrateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hydrateUserThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
        state.isLoading = false;
      })
      .addCase(hydrateUserThunk.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });

    // Logout
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.sessionToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
