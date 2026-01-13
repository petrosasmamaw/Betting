import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const fetchUserBySupabaseId = createAsyncThunk('users/fetchBySupabase', async (supabaseId, thunkAPI) => {
  try {
    const res = await api.get(`/users/supabase/${supabaseId}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const createUser = createAsyncThunk('users/create', async (payload, thunkAPI) => {
  try {
    const res = await api.post('/users', payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, thunkAPI) => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'users',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchUserBySupabaseId.fulfilled, (state, action) => { state.items = action.payload ? [action.payload] : []; })

      .addCase(createUser.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id || i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload && i.id !== action.payload);
      });
  },
});

export default slice.reducer;
