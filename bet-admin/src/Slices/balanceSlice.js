import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 
const BALANCE_URL = `${BASE_URL}/balances`;

export const fetchBalances = createAsyncThunk('balances/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(BALANCE_URL);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const fetchBalancesBySupabaseId = createAsyncThunk('balances/fetchBySupabase', async (supabaseId, thunkAPI) => {
  try {
    const res = await axios.get(`${BALANCE_URL}/supabase/${supabaseId}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const createBalance = createAsyncThunk('balances/create', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(BALANCE_URL, payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const updateBalance = createAsyncThunk('balances/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${BALANCE_URL}/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteBalance = createAsyncThunk('balances/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${BALANCE_URL}/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'balances',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBalances.pending, state => { state.loading = true; })
      .addCase(fetchBalances.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchBalances.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchBalancesBySupabaseId.fulfilled, (state, action) => { state.items = action.payload; })

      .addCase(createBalance.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(updateBalance.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id || i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteBalance.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload && i.id !== action.payload);
      });
  },
});

export default slice.reducer;
