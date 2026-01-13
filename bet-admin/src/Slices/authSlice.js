import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const register = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/auth/register', payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const login = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/auth/login', payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await api.post('/auth/logout');
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const getSession = createAsyncThunk('auth/session', async (_, thunkAPI) => {
  try {
    const res = await api.get('/auth/session');
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/auth/forgot-password', payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, message: null },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.message = action.payload.message; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(login.pending, state => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(logout.fulfilled, state => { state.user = null; state.message = null; })

      .addCase(getSession.pending, state => { state.loading = true; })
      .addCase(getSession.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(getSession.rejected, state => { state.loading = false; state.user = null; })

      .addCase(forgotPassword.fulfilled, (state, action) => { state.message = action.payload.message; });
  },
});

export const { clearAuthError } = slice.actions;
export default slice.reducer;
