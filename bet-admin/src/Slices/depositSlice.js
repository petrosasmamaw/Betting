import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 
const DEPOSITS_URL = `${BASE_URL}/deposits`;

export const fetchDeposits = createAsyncThunk('deposits/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(DEPOSITS_URL);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const fetchDepositsBySupabaseId = createAsyncThunk('deposits/fetchBySupabase', async (supabaseId, thunkAPI) => {
  try {
    const res = await axios.get(`${DEPOSITS_URL}/supabase/${supabaseId}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const createDeposit = createAsyncThunk('deposits/create', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(DEPOSITS_URL, payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const updateDeposit = createAsyncThunk('deposits/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${DEPOSITS_URL}/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteDeposit = createAsyncThunk('deposits/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${DEPOSITS_URL}/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'deposits',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDeposits.pending, state => { state.loading = true; })
      .addCase(fetchDeposits.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchDeposits.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchDepositsBySupabaseId.fulfilled, (state, action) => { state.items = action.payload; })

      .addCase(createDeposit.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(updateDeposit.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id || i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteDeposit.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload && i.id !== action.payload);
      });
  },
});

export default slice.reducer;
