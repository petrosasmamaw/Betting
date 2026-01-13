import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 
const BETS_URL = `${BASE_URL}/bets`;

export const fetchBets = createAsyncThunk('bets/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(BETS_URL);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const fetchBetsBySupabaseId = createAsyncThunk('bets/fetchBySupabase', async (supabaseId, thunkAPI) => {
  try {
    const res = await axios.get(`${BETS_URL}/supabase/${supabaseId}`);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const createBet = createAsyncThunk('bets/create', async (payload, thunkAPI) => {
  try {
    const res = await axios.post(BETS_URL, payload);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const updateBet = createAsyncThunk('bets/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axios.put(`${BETS_URL}/${id}`, data);
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

export const deleteBet = createAsyncThunk('bets/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`${BETS_URL}/${id}`);
    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response?.data || e.message);
  }
});

const slice = createSlice({
  name: 'bets',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBets.pending, state => { state.loading = true; })
      .addCase(fetchBets.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchBets.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchBetsBySupabaseId.fulfilled, (state, action) => { state.items = action.payload; })

      .addCase(createBet.fulfilled, (state, action) => { state.items.push(action.payload); })

      .addCase(updateBet.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i._id === action.payload._id || i.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      .addCase(deleteBet.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i._id !== action.payload && i.id !== action.payload);
      });
  },
});

export default slice.reducer;
