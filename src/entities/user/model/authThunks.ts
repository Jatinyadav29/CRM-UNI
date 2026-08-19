import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { authApi } from '../api/authApi';
import type { ILoginCredentials, IRegisterPayload, IUser } from './types';

export const loginUserThunk = createAsyncThunk<
  { user: IUser; token: string },
  ILoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authApi.login(credentials);
    toast.success(`Welcome back, ${data.user.fullName}!`);
    return data;
  } catch {
    toast.error('Authentication failed. Please check your credentials.');
    return rejectWithValue('Authentication failed');
  }
});

export const registerUserThunk = createAsyncThunk<
  { user: IUser; token: string },
  IRegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.register(payload);
    toast.success('Account created successfully!');
    return data;
  } catch {
    toast.error('Registration failed.');
    return rejectWithValue('Registration failed');
  }
});

export const hydrateUserThunk = createAsyncThunk<
  IUser | null,
  void,
  { rejectValue: string }
>('auth/hydrate', async (_, { rejectWithValue }) => {
  try {
    const user = await authApi.hydrate();
    return user;
  } catch {
    return rejectWithValue('Session hydration failed');
  }
});

export const logoutUserThunk = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    await authApi.logout();
    toast.info('Signed out.');
  }
);
