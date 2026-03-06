import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFootballMatches = createAsyncThunk(
  "football/fetchMatches",
  async (_, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${base}/football/matches`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.matches || data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch matches");
    }
  }
);

const footballSlice = createSlice({
  name: "football",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootballMatches.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFootballMatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFootballMatches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default footballSlice.reducer;
