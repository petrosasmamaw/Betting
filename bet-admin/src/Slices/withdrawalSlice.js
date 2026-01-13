import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 
const WITHDRAWALS_URL = `${BASE_URL}/withdrawals`;

export const fetchWithdrawals = createAsyncThunk('withdrawals/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(WITHDRAWALS_URL);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const fetchWithdrawalsBySupabaseId = createAsyncThunk('withdrawals/fetchBySupabase', async (supabaseId, thunkAPI) => {
  try {
    const res = await axios.get(`${WITHDRAWALS_URL}/supabase/${supabaseId}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const createWithdrawal = createAsyncThunk('withdrawals/create', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(WITHDRAWALS_URL, payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const updateWithdrawal = createAsyncThunk('withdrawals/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${WITHDRAWALS_URL}/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteWithdrawal = createAsyncThunk('withdrawals/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${WITHDRAWALS_URL}/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'withdrawals',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWithdrawals.pending, state => { state.loading = true; })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchWithdrawals.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchWithdrawalsBySupabaseId.fulfilled, (state, action) => { state.items = action.payload; })

      .addCase(createWithdrawal.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(updateWithdrawal.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id || i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteWithdrawal.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload && i.id !== action.payload);
      });
  },
});

export default slice.reducer;
